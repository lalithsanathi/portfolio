import { Link } from '@tanstack/react-router';
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { markNavProgrammaticScroll } from '../components/SiteNav';
import { useImagesLoaded } from '../hooks/useImagesLoaded';
import { getWorkScrollOffset } from '../utils/workScroll';

interface HomeProject {
  id: string;
  title: string;
  className: string;
  href?: string;
  imageSrc?: string;
  /** Samples under the fixed nav use this for light/dark link treatment. */
  navTheme?: 'light' | 'dark';
}

/** Preload targets for the work grid so thumbnails start loading with the route, not after paint. */
const HOME_PROJECT_IMAGE_URLS = [
  '/images/projects/malted-srm/project-card-thumbnail.png',
  '/images/home-test/ve03.png',
  '/images/home-test/dashboard.png',
  '/images/home-test/phone-mockup.png',
  '/images/home-test/type-space.png',
] as const;

const projects: HomeProject[] = [
  {
    id: 'malted-srm',
    title: 'Accelerating due diligence at Malted',
    href: '/projects/malted-srm',
    className: 'bg-stone-200',
    imageSrc: '/images/projects/malted-srm/project-card-thumbnail.png',
  },
  {
    id: 'malted-pulse',
    title: 'Malted Pulse',
    href: '/projects/malted-pulse',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/ve03.png',
  },
  {
    id: 'national-grid-intro',
    title: 'Bringing balance at National Grid',
    href: '/projects/national-grid-intro',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/dashboard.png',
    navTheme: 'dark',
  },
  {
    id: 'community-crisis',
    title: 'A community platform for times of crisis',
    href: '/projects/community-crisis',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/phone-mockup.png',
  },
  {
    id: 'embedding-models',
    title: 'A visual, Spatial Search for Typefaces',
    href: '/projects/embedding-models',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/type-space.png',
    navTheme: 'dark',
  },
  {
    id: 'coming-soon',
    title: 'Coming soon',
    className: 'bg-stone-200',
  },
] as const;

/** Keep the card itself free of animated filters; WebKit can snap `filter` on image-containing layers. */
const gridCardSpring = { type: 'spring' as const, duration: 0.6, bounce: 0 };

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: gridCardSpring,
  },
};

const imageBlurOverlayVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: {
      duration: 0.55,
      ease: [0.2, 0, 0, 1],
    },
  },
};

const staticVariants: Variants = { hidden: {}, visible: {} };

function readStartsAtTop(): boolean | null {
  if (typeof window === 'undefined') return null;
  return !window.location.hash && window.scrollY < 100;
}

const HOME_HERO_FULL_ANIM_SESSION_KEY = 'portfolio-home-hero-full:v1';

function readHomeHeroFullAnimDone(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      sessionStorage.getItem(HOME_HERO_FULL_ANIM_SESSION_KEY) === '1'
    );
  } catch {
    return false;
  }
}

const HERO_HEADING =
  "I'm Lalith, a UX designer  building expressive, AI-native products.";

const HERO_HEADING_WORDS = HERO_HEADING.split(/\s+/);
const HERO_HEADING_STAGGER = 0.032;
const HERO_HEADING_DELAY_CHILDREN = 0.2;
const HERO_HEADING_STAGGER_SPAN =
  Math.max(0, HERO_HEADING_WORDS.length - 1) * HERO_HEADING_STAGGER;
/** ~80% through word stagger — LinkedIn, subtext, and grid wait until here. */
const HERO_POST_HEADING_DELAY =
  HERO_HEADING_DELAY_CHILDREN + 0.8 * HERO_HEADING_STAGGER_SPAN;
const HERO_SUBTEXT_DELAY = HERO_POST_HEADING_DELAY + 0.15;
/** Full-session hero: grid must start after subtext, not alongside it (was tied to post-heading only). */
const HERO_GRID_DELAY_AFTER_SUBTEXT = 0.24;
const WORK_HASH_GRID_REVEAL_DELAY_MS = 180;

const heroWordVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};

const heroHeadingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: HERO_HEADING_STAGGER,
      delayChildren: HERO_HEADING_DELAY_CHILDREN,
    },
  },
};

/** Parent drives stagger; cards are direct motion children so variant propagation works (Link cannot wrap the motion node). */
function makeGridContainerVariants(
  reduceMotion: boolean | null,
  startsAtTop: boolean | null,
  useDeferredHeroTiming: boolean,
): Variants {
  if (reduceMotion) return staticVariants;
  const delayChildren = useDeferredHeroTiming
    ? (HERO_SUBTEXT_DELAY + HERO_GRID_DELAY_AFTER_SUBTEXT) as number
    : ((startsAtTop ? 0.55 : 0.05) as number);
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren,
      },
    },
  };
}

interface ProjectCardProps {
  project: HomeProject;
  index: number;
  reduceMotion: boolean | null;
  blurOverlayEnabled: boolean;
}

function ProjectCard({
  project,
  index,
  reduceMotion,
  blurOverlayEnabled,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={reduceMotion ? staticVariants : itemVariants}
      className={`group relative aspect-7/6 overflow-hidden rounded-2xl will-change-transform ${project.className}`}
      {...(project.navTheme
        ? { 'data-nav-theme': project.navTheme }
        : undefined)}
    >
      {project.imageSrc ? (
        <>
          <img
            src={project.imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading={index < 2 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'auto'}
            decoding="async"
          />
          {!reduceMotion && blurOverlayEnabled ? (
            <motion.img
              src={project.imageSrc}
              alt=""
              aria-hidden
              variants={imageBlurOverlayVariants}
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.04] object-cover object-center blur-md will-change-opacity"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
          ) : null}
        </>
      ) : null}
      {project.href ? (
        <Link
          to={project.href}
          preload="viewport"
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          aria-label={project.title}
        />
      ) : (
        <span className="sr-only">{project.title}</span>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset" />
    </motion.div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroFullAnimAlreadyPlayed = useMemo(() => readHomeHeroFullAnimDone(), []);
  const playFullSessionHero = !reduceMotion && !heroFullAnimAlreadyPlayed;
  const projectGridRef = useRef<HTMLElement>(null);
  /** Positive bottom rootMargin so below-the-fold grids still intersect on first paint (narrow viewports / iPad).
   * Negative margins shrink the root and defer intersection until extra scroll — bad for landing UX.
   * (`MarginType` only allows px | %, not vh.) */
  const projectsInView = useInView(projectGridRef, {
    once: true,
    margin: '0px 0px 100% 0px',
  });
  const [startsAtTop] = useState<boolean | null>(readStartsAtTop);
  /** SPA / full load with `#work`: let the nav transition get first paint before the heavier image reveal. */
  const [workGridMotionDeferred, setWorkGridMotionDeferred] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.location.hash === '#work',
  );
  const [blurOverlaysEnabled, setBlurOverlaysEnabled] = useState(
    () =>
      typeof window === 'undefined' ||
      window.location.hash !== '#work',
  );

  const projectImageUrls = projects
    .map((p) => p.imageSrc)
    .filter((src): src is string => Boolean(src));
  const projectImagesReady = useImagesLoaded(projectImageUrls);

  const gridRevealReady =
    startsAtTop !== null &&
    projectsInView &&
    projectImagesReady &&
    !workGridMotionDeferred;
  const gridContainerVariants = useMemo(
    () =>
      makeGridContainerVariants(
        reduceMotion,
        startsAtTop,
        playFullSessionHero,
      ),
    [reduceMotion, startsAtTop, playFullSessionHero],
  );

  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: 'blur(12px)', y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  useLayoutEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of HOME_PROJECT_IMAGE_URLS) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, []);

  // When the home page mounts via SPA navigation with a #work hash (e.g. from
  // clicking the nav's "Work" link on a project page), TanStack's scroll
  // restoration scrolls to the top. Override that synchronously, before the
  // first paint, so we land directly on the work section. We also flag the
  // jump as programmatic so the nav springs to its new resting top instead
  // of being subject to the |dy| threshold.
  useLayoutEffect(() => {
    if (window.location.hash !== '#work') {
      return;
    }
    const target = document.getElementById('work');
    if (!target) {
      const releaseFrame = requestAnimationFrame(() => {
        setBlurOverlaysEnabled(true);
        setWorkGridMotionDeferred(false);
      });
      return () => cancelAnimationFrame(releaseFrame);
    }
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getWorkScrollOffset();
    markNavProgrammaticScroll();
    window.scrollTo({ top, behavior: 'auto' });

    let revealFrame: number | null = null;
    const revealTimer = window.setTimeout(() => {
      setBlurOverlaysEnabled(true);
      revealFrame = requestAnimationFrame(() => {
        setWorkGridMotionDeferred(false);
      });
    }, WORK_HASH_GRID_REVEAL_DELAY_MS);
    return () => {
      window.clearTimeout(revealTimer);
      if (revealFrame !== null) cancelAnimationFrame(revealFrame);
    };
  }, []);

  useEffect(() => {
    let clearHashTimer: number | null = null;

    const clearTimer = () => {
      if (clearHashTimer === null) return;
      window.clearTimeout(clearHashTimer);
      clearHashTimer = null;
    };

    const handleScroll = () => {
      if (window.location.hash !== '#work' || window.scrollY >= 100) {
        clearTimer();
        return;
      }

      clearTimer();
      clearHashTimer = window.setTimeout(() => {
        if (window.location.hash === '#work' && window.scrollY < 100) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }, 180);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimer();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!playFullSessionHero) return;
    const markMs = Math.ceil(
      (HERO_HEADING_DELAY_CHILDREN + HERO_HEADING_STAGGER_SPAN + 0.9) * 1000,
    );
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(HOME_HERO_FULL_ANIM_SESSION_KEY, '1');
      } catch {
        /* private mode / quota */
      }
    }, markMs);
    return () => clearTimeout(id);
  }, [playFullSessionHero]);

  return (
    <main className="relative min-h-screen px-10 pb-48 pt-44 lg:px-20 md:pt-36 xl:pt-44 2xl:pt-72 [@media(min-width:1280px)_and_(pointer:coarse)]:pt-52! 2xl:px-page-edge-2xl">
      <motion.a
        href="https://www.linkedin.com/in/laliths/"
        aria-label="LinkedIn"
        className="absolute right-10 top-16 z-60 -mx-4 flex min-h-12 items-center rounded-full px-4 text-black/80 transition-[color,transform] duration-300 ease-out hover:text-black active:scale-[0.96] md:top-12 lg:right-20 xl:top-16 2xl:top-30 [@media(min-width:1280px)_and_(pointer:coarse)]:top-16! 2xl:right-[max(5rem,calc((100vw-1536px)/2))]"
        initial={heroInitial}
        animate={heroAnimate}
        transition={{
          type: 'spring',
          duration: 0.7,
          bounce: 0,
          delay:
            reduceMotion ? 0 : playFullSessionHero ? HERO_POST_HEADING_DELAY : 0,
        }}
      >
        <span className="-mx-3 flex size-12 items-center justify-center rounded-full transition-colors duration-300 ease-out hover:bg-white/70">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-8 fill-current"
          >
            <path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM11.4 24H8.5V13.6h2.9V24ZM10 12.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM24 24h-2.9v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V24h-2.9V13.6h2.8V15h.1a3.1 3.1 0 0 1 2.8-1.6c3 0 3.6 2 3.6 4.6V24Z" />
          </svg>
        </span>
      </motion.a>

      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-12">
        {reduceMotion ? (
          <h1 className="col-span-12 max-w-3xl text-pretty font-display text-[56px] leading-[72px] sm:max-w-4xl">
            {HERO_HEADING}
          </h1>
        ) : playFullSessionHero ? (
          <motion.h1
            className="col-span-12 max-w-3xl text-pretty font-display text-[56px] leading-[72px] sm:max-w-4xl"
            variants={heroHeadingContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {HERO_HEADING_WORDS.map((word, i) => (
              <Fragment key={`${i}-${word}`}>
                <motion.span variants={heroWordVariants} className="inline">
                  {word}
                </motion.span>
                {i < HERO_HEADING_WORDS.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </motion.h1>
        ) : (
          <motion.h1
            className="col-span-12 max-w-3xl text-pretty font-display text-[56px] leading-[72px] sm:max-w-4xl"
            initial={heroInitial}
            animate={heroAnimate}
            transition={{
              type: 'spring',
              duration: 0.7,
              bounce: 0,
              delay: 0.2,
            }}
          >
            {HERO_HEADING}
          </motion.h1>
        )}
        <motion.p
          className="col-span-12 mt-8 text-[28px] font-regular leading-10 text-gray-warm-700 text-pretty xl:col-span-10 md:mt-9 xl:mt-10 2xl:col-span-8"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{
            type: 'spring',
            duration: 0.7,
            bounce: 0,
            delay:
              reduceMotion ? 0 : playFullSessionHero ? HERO_SUBTEXT_DELAY : 0.4,
          }}
        >
          I’ve made Figma
          plugins used by hundreds of people, given talks about the future of
          interaction design, and enjoy mentoring other designers.
        </motion.p>
      </section>

      <motion.section
        ref={projectGridRef}
        id="work"
        className="mx-auto mt-32 grid w-full max-w-screen-2xl scroll-mt-20 grid-cols-1 gap-4 md:mt-24 xl:mt-24 2xl:mt-64 md:scroll-mt-24 md:grid-cols-2"
        style={{ visibility: startsAtTop === null ? 'hidden' : undefined }}
        variants={gridContainerVariants}
        initial="hidden"
        animate={gridRevealReady ? 'visible' : 'hidden'}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            reduceMotion={reduceMotion}
            blurOverlayEnabled={blurOverlaysEnabled}
          />
        ))}
      </motion.section>

      {/* Tall dark band: same-route scroll test for `data-nav-theme` / SiteNav sampler */}
      {/* <section
        data-nav-theme="dark"
        aria-label="Dark section (nav theme test)"
        className="mx-auto mt-32 flex min-h-[85vh] w-full max-w-screen-2xl flex-col justify-center rounded-2xl bg-black px-10 py-24 text-[#e5e1c3] md:mt-40 lg:px-20 md:py-32"
      >
        <p className="max-w-2xl text-pretty text-2xl font-medium leading-snug md:text-3xl md:leading-tight">
          Same-route nav theme test: keep scrolling — the bar should switch to
          the dark treatment over this block, then back to light below.
        </p>
      </section> */}

      {/* <section
        aria-hidden
        className="mx-auto mt-16 w-full max-w-screen-2xl pb-32 md:mt-24 md:pb-40"
      >
        <div className="h-24 rounded-2xl bg-gray-warm-100 md:h-32" />
      </section> */}
    </main>
  );
}
