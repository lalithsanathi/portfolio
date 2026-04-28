import { Link } from '@tanstack/react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { markNavProgrammaticScroll } from '../components/SiteNav';
import { useImagesLoaded } from '../hooks/useImagesLoaded';

interface HomeProject {
  id: string;
  title: string;
  className: string;
  href?: string;
  imageSrc?: string;
}

/** Preload targets for the work grid so thumbnails start loading with the route, not after paint. */
const HOME_PROJECT_IMAGE_URLS = [
  '/images/home-test/ve03.png',
  '/images/home-test/dashboard.png',
  '/images/home-test/phone-mockup.png',
  '/images/home-test/type-space.png',
] as const;

const projects: HomeProject[] = [
  {
    id: 'malted-pulse',
    title: 'Malted Pulse',
    href: '/projects/malted-pulse',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/ve03.png',
  },
  {
    id: 'malted-srm',
    title: 'Bringing balance at National Grid',
    href: '/projects/national-grid-intro',
    className: 'bg-stone-200',
    imageSrc: '/images/home-test/dashboard.png',
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
  },
  {
    id: 'coming-soon-1',
    title: 'Coming soon',
    className: 'bg-stone-200',
  },
  {
    id: 'coming-soon-2',
    title: 'Coming soon',
    className: 'bg-stone-200',
  },
] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};

const staticVariants: Variants = { hidden: {}, visible: {} };

interface ProjectCardProps {
  project: HomeProject;
  index: number;
  isInView: boolean;
  startsAtTop: boolean | null;
  reduceMotion: boolean | null;
}

function ProjectCard({
  project,
  index,
  isInView,
  startsAtTop,
  reduceMotion,
}: ProjectCardProps) {
  const imageReady = useImagesLoaded(
    project.imageSrc ? [project.imageSrc] : [],
    Boolean(project.imageSrc),
  );
  const canReveal =
    startsAtTop !== null && isInView && (!project.imageSrc || imageReady);
  const animate = canReveal || reduceMotion ? 'visible' : 'hidden';
  const transitionDelay = (startsAtTop ? 0.55 : 0.05) + index * 0.08;
  const card = (
    <motion.div
      variants={reduceMotion ? staticVariants : itemVariants}
      initial="hidden"
      animate={animate}
      transition={
        reduceMotion
          ? undefined
          : { type: 'spring', duration: 0.6, bounce: 0, delay: transitionDelay }
      }
      className={`group relative aspect-7/6 overflow-hidden rounded-2xl ${project.className}`}
    >
      {project.imageSrc ? (
        <img
          src={project.imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading={index < 2 ? 'eager' : 'lazy'}
          fetchPriority={index < 2 ? 'high' : 'auto'}
          decoding="async"
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset" />
      <span className="sr-only">{project.title}</span>
    </motion.div>
  );

  if (!project.href) {
    return card;
  }

  return (
    <Link
      to={project.href}
      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
      aria-label={project.title}
    >
      {card}
    </Link>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const projectGridRef = useRef<HTMLElement>(null);
  const projectsInView = useInView(projectGridRef, {
    once: true,
    margin: '-10% 0px',
  });
  const [startsAtTop, setStartsAtTop] = useState<boolean | null>(null);

  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: 'blur(12px)', y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      setStartsAtTop(!window.location.hash && window.scrollY < 100);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

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
    if (window.location.hash !== '#work') return;
    const target = document.getElementById('work');
    if (!target) return;
    const top =
      target.getBoundingClientRect().top + window.scrollY - 80;
    markNavProgrammaticScroll();
    window.scrollTo({ top, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash === '#work' && window.scrollY < 100) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen px-6 pb-48 pt-48 md:px-14 md:pt-60 xl:px-20 xl:pt-72 2xl:px-0">
      <motion.a
        href="https://www.linkedin.com/in/laliths/"
        aria-label="LinkedIn"
        className="absolute right-6 top-16 z-60 -mx-4 flex min-h-12 items-center rounded-full px-4 text-black/80 transition-[color,transform] duration-300 ease-out hover:text-black active:scale-[0.96] md:right-14 md:top-24 xl:right-20 xl:top-30 2xl:right-[calc((100vw-1536px)/2)]"
        initial={heroInitial}
        animate={heroAnimate}
        transition={{ type: 'spring', duration: 0.7, bounce: 0 }}
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
        <motion.h1
          className="col-span-12 font-display text-[64px] leading-[80px] md:col-span-11 lg:col-span-10"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ type: 'spring', duration: 0.7, bounce: 0, delay: 0.2 }}
        >
          Award winning London based designer with over 6 years of experience
          building expressive, AI-native products.
        </motion.h1>
        <motion.p
          className="col-span-12 mt-10 text-[28px] font-regular leading-10 text-gray-warm-500 text-pretty md:col-span-10 lg:col-span-8"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{ type: 'spring', duration: 0.7, bounce: 0, delay: 0.4 }}
        >
          I mix systems and analogies, and design by building. I’ve made Figma
          plugins used by hundreds of people, given talks about the future of
          interaction design, and enjoy mentoring other designers.
        </motion.p>
      </section>

      <motion.section
        ref={projectGridRef}
        id="work"
        className="mx-auto mt-56 grid w-full max-w-screen-2xl scroll-mt-20 grid-cols-1 gap-4 md:scroll-mt-24 md:grid-cols-2"
        style={{ visibility: startsAtTop === null ? 'hidden' : undefined }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isInView={projectsInView}
            startsAtTop={startsAtTop}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.section>

      {/* Tall dark band: same-route scroll test for `data-nav-theme` / SiteNav sampler */}
      {/* <section
        data-nav-theme="dark"
        aria-label="Dark section (nav theme test)"
        className="mx-auto mt-32 flex min-h-[85vh] w-full max-w-screen-2xl flex-col justify-center rounded-2xl bg-black px-6 py-24 text-[#e5e1c3] md:mt-40 md:px-14 md:py-32 xl:px-20"
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
