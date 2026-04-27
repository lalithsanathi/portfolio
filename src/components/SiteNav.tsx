import { useNavigate, useRouterState } from '@tanstack/react-router';
import { ArrowUp, Home as HomeIcon } from '@carbon/icons-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  stagger,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';

const navSpring = {
  type: 'spring' as const,
  stiffness: 215,
  damping: 12.5,
  mass: 0.5,
};

/** Interval between each nav item’s layout shift (lead → Work → About). */
const NAV_CLUSTER_LAYOUT_STAGGER_S = 0.029;

const NAV_HEIGHT_OFFSET = 96;

/** Default jump threshold (px). The tuner overlay can override this at runtime
 *  without remounting the scroll listener (see `jumpThresholdRef`). */
const NAV_JUMP_THRESHOLD_PX = 600;

/** When a scroll is flagged as programmatic, the next scroll events within
 *  this window are classified as jumps regardless of `|dy|`. The window has
 *  to be long enough to cover scroll-restoration + a follow-up scrollTo
 *  (Home's `#work` jump can land in two events), but short enough that real
 *  user input that immediately follows is not misclassified. */
const NAV_PROGRAMMATIC_WINDOW_MS = 200;

type NavTheme = 'light' | 'dark';

/**
 * Subscriber set for `markNavProgrammaticScroll()`. SiteNav registers a
 * listener on mount; external callers can flag any upcoming scroll change as
 * programmatic and force the nav to spring to its new resting top, even if
 * `|dy|` is below the threshold.
 *
 * Usage:
 *   import { markNavProgrammaticScroll } from '@/components/SiteNav';
 *   markNavProgrammaticScroll();
 *   window.scrollTo({ top: 200 });
 */
const programmaticListeners = new Set<() => void>();

export function markNavProgrammaticScroll() {
  programmaticListeners.forEach((fn) => fn());
}

const navThemeOverrideListeners = new Set<(theme: NavTheme | null) => void>();
let navThemeOverride: NavTheme | null = null;

export function setNavThemeOverride(theme: NavTheme | null) {
  navThemeOverride = theme;
  navThemeOverrideListeners.forEach((fn) => fn(theme));
}

/**
 * Vertical positions per breakpoint, in px:
 *   - initialTop matches the spacer the home page used to render before the
 *     nav (`h-16 md:h-24 xl:h-30`).
 *   - stuckTop matches the home page's `sticky top-4 md:top-6` resting
 *     position when scrolled.
 *
 * The nav linearly slides between these two via scroll position so it feels
 * like a sticky element without actually being sticky in the DOM (the nav is
 * persistent at the root of the app, so CSS sticky cannot work here).
 */
const NAV_BREAKPOINTS = {
  sm: { initialTop: 64, stuckTop: 16 },
  md: { initialTop: 96, stuckTop: 24 },
  xl: { initialTop: 120, stuckTop: 24 },
} as const;

type Breakpoint = keyof typeof NAV_BREAKPOINTS;

type NavHoverKey = 'lead' | 'work' | 'about';

type NavHoverPillRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'sm';
  if (window.matchMedia('(min-width: 1280px)').matches) return 'xl';
  if (window.matchMedia('(min-width: 768px)').matches) return 'md';
  return 'sm';
}

function smoothScrollTo(targetTop: number, durationMs = 1200) {
  const start = window.scrollY;
  const distance = targetTop - start;
  const startTime = performance.now();
  let frame: number | null = null;

  const easeInOutCubic = (p: number) =>
    p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;

  const step = (now: number) => {
    const t = Math.min((now - startTime) / durationMs, 1);
    window.scrollTo({
      top: start + distance * easeInOutCubic(t),
      behavior: 'auto',
    });
    if (t < 1) {
      frame = requestAnimationFrame(step);
    }
  };

  frame = requestAnimationFrame(step);

  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
  };
}

function useNavTheme(
  navClusterRef: React.RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  const [theme, setTheme] = useState<NavTheme>(navThemeOverride ?? 'light');
  const [overrideVersion, setOverrideVersion] = useState(0);
  const overrideRef = useRef<NavTheme | null>(navThemeOverride);

  useEffect(() => {
    const onOverrideChange = (nextOverride: NavTheme | null) => {
      overrideRef.current = nextOverride;
      setOverrideVersion((version) => version + 1);
      if (nextOverride !== null) setTheme(nextOverride);
    };

    navThemeOverrideListeners.add(onOverrideChange);
    return () => {
      navThemeOverrideListeners.delete(onOverrideChange);
    };
  }, []);

  useLayoutEffect(() => {
    let frame: number | null = null;

    const sampleTheme = () => {
      frame = null;

      if (overrideRef.current !== null) {
        setTheme(overrideRef.current);
        return;
      }

      const cluster = navClusterRef.current;
      if (!cluster) {
        setTheme('light');
        return;
      }

      const rect = cluster.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const navRoot = cluster.closest('nav');

      const themedElement = document
        .elementsFromPoint(x, y)
        .filter((element) => !navRoot?.contains(element))
        .map((element) => element.closest<HTMLElement>('[data-nav-theme]'))
        .find((element): element is HTMLElement => element != null);

      setTheme(themedElement?.dataset.navTheme === 'dark' ? 'dark' : 'light');
    };

    const scheduleSample = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(sampleTheme);
    };

    sampleTheme();
    scheduleSample();
    window.addEventListener('scroll', scheduleSample, { passive: true });
    window.addEventListener('resize', scheduleSample);

    return () => {
      window.removeEventListener('scroll', scheduleSample);
      window.removeEventListener('resize', scheduleSample);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [navClusterRef, overrideVersion, pathname]);

  return theme;
}

/** Lead control next to Work: classic home glyph, or an arrow (up on Home for
 *  “back to top”, rotated left elsewhere for “back” to the index). */
export type SiteNavLeadIcon = 'home' | 'arrow';

type SiteNavProps = {
  leadIcon?: SiteNavLeadIcon;
};

export default function SiteNav({ leadIcon = 'arrow' }: SiteNavProps = {}) {
  const showNavTuner = false;
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === '/';

  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');
  const [stuck, setStuck] = useState(false);
  const [navHover, setNavHover] = useState<NavHoverKey | null>(null);
  const [hoverPillRect, setHoverPillRect] = useState<NavHoverPillRect | null>(
    null,
  );
  const navClusterRef = useRef<HTMLDivElement | null>(null);
  const navTheme = useNavTheme(navClusterRef, pathname);
  const navItemRefs = useRef<Record<NavHoverKey, HTMLAnchorElement | null>>({
    lead: null,
    work: null,
    about: null,
  });
  const navTop = useMotionValue<number>(NAV_BREAKPOINTS.sm.initialTop);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  const [jumpThreshold, setJumpThresholdState] = useState(NAV_JUMP_THRESHOLD_PX);
  const jumpThresholdRef = useRef(jumpThreshold);
  const handleJumpThresholdChange = useCallback((value: number) => {
    jumpThresholdRef.current = value;
    setJumpThresholdState(value);
  }, []);

  // Performance.now() deadline; while now() < this value, scroll events are
  // forced into the jump path. Updated by route changes and by external
  // calls to `markNavProgrammaticScroll()`.
  const programmaticUntilRef = useRef(0);
  const [programmaticTick, setProgrammaticTick] = useState(0);

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Register the imperative API.
  useEffect(() => {
    const mark = () => {
      programmaticUntilRef.current =
        performance.now() + NAV_PROGRAMMATIC_WINDOW_MS;
      setProgrammaticTick((n) => n + 1);
    };
    programmaticListeners.add(mark);
    return () => {
      programmaticListeners.delete(mark);
    };
  }, []);

  // Auto-flag every route change as programmatic (skip the very first run on
  // initial mount — there's no real navigation there). useLayoutEffect runs
  // synchronously after commit, before any scroll event triggered by the new
  // page's own useLayoutEffect (e.g. Home scrolling to #work) is dispatched.
  const firstPathnameRunRef = useRef(true);
  useLayoutEffect(() => {
    if (firstPathnameRunRef.current) {
      firstPathnameRunRef.current = false;
      return;
    }
    programmaticUntilRef.current =
      performance.now() + NAV_PROGRAMMATIC_WINDOW_MS;
    setProgrammaticTick((n) => n + 1);
  }, [pathname]);

  const { initialTop, stuckTop } = NAV_BREAKPOINTS[breakpoint];
  const stickPoint = initialTop - stuckTop;

  const computeNavTop = useCallback(
    (y: number) => {
      // Linearly interpolates between initialTop and stuckTop and clamps,
      // which gives the sticky-on-scroll behaviour without the nav being
      // sticky in the DOM (it lives at the root of the app and persists
      // across routes, so CSS sticky cannot work here).
      if (y <= 0) return initialTop;
      if (y >= stickPoint) return stuckTop;
      return initialTop + ((stuckTop - initialTop) * y) / stickPoint;
    },
    [initialTop, stuckTop, stickPoint],
  );

  // Drive navTop from window.scrollY. For natural scrolling we update navTop
  // synchronously so it stays glued to the scroll position. When the scroll
  // position jumps discontinuously — e.g. TanStack's scroll-restoration on
  // route change, or Home's `scrollTo` for `#work` — we hold navTop at its
  // pre-jump value, wait for the scroll to settle, and then spring to the
  // new target. That makes the nav animate between routes that have
  // different vertical resting positions, instead of snapping.
  useEffect(() => {
    const SETTLE_DELAY_MS = 60;
    const INITIAL_GRACE_MS = 300;

    const startTime = performance.now();
    let prevY = window.scrollY;
    let settleTimer: number | null = null;
    let inflight: { stop: () => void } | null = null;

    // Sync immediately on mount and breakpoint change.
    navTop.set(computeNavTop(prevY));
    setStuck(prevY >= stickPoint);

    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y >= stickPoint);

      const dy = y - prevY;
      prevY = y;

      const now = performance.now();
      const elapsed = now - startTime;
      const isProgrammatic = now < programmaticUntilRef.current;
      // Programmatic flag bypasses both the dy threshold and the initial
      // grace period — if something explicitly says "animate this", honour it.
      const isJump =
        !reduceMotion &&
        (isProgrammatic ||
          (elapsed > INITIAL_GRACE_MS &&
            Math.abs(dy) > jumpThresholdRef.current));

      if (isJump) {
        // Hold navTop. Reset the settle timer so a series of jumps (e.g.
        // scroll-restoration immediately followed by `scrollTo(#work)`)
        // collapses into a single animation to the final position.
        if (settleTimer !== null) window.clearTimeout(settleTimer);
        inflight?.stop();

        settleTimer = window.setTimeout(() => {
          const target = computeNavTop(window.scrollY);
          inflight = animate(navTop, target, navSpring);
          settleTimer = null;
        }, SETTLE_DELAY_MS);
      } else if (settleTimer === null) {
        // Normal scroll: track instantly. Cancel any in-flight spring so
        // user input always wins over a pending route-transition animation.
        inflight?.stop();
        inflight = null;
        navTop.set(computeNavTop(y));
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      inflight?.stop();
      cancelScrollRef.current?.();
    };
  }, [computeNavTop, navTop, reduceMotion, stickPoint]);

  const pillVisible = stuck;
  const showHomeIcon = !isHome || stuck;

  const { workLayoutDelay, aboutLayoutDelay } = useMemo(() => {
    if (reduceMotion) {
      return { workLayoutDelay: 0, aboutLayoutDelay: 0 };
    }
    const delayFor = stagger(NAV_CLUSTER_LAYOUT_STAGGER_S, { from: 'first' });
    return showHomeIcon
      ? {
          workLayoutDelay: delayFor(1, 3),
          aboutLayoutDelay: delayFor(2, 3),
        }
      : {
          workLayoutDelay: delayFor(0, 2),
          aboutLayoutDelay: delayFor(1, 2),
        };
  }, [reduceMotion, showHomeIcon]);

  useLayoutEffect(() => {
    if (!showHomeIcon && navHover === 'lead') {
      setNavHover(null);
      setHoverPillRect(null);
    }
  }, [showHomeIcon, navHover]);

  const measureHoverPill = useCallback((key: NavHoverKey) => {
    const c = navClusterRef.current;
    const target = navItemRefs.current[key];
    if (!c || !target) return;

    // Use layout offsets, not transformed bounding rects, so route/layout
    // changes retarget the pill to the final item position before paint.
    setHoverPillRect({
      left: target.offsetLeft,
      top: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight,
    });
  }, []);

  const handleNavItemEnter = useCallback(
    (key: NavHoverKey) => {
      setNavHover(key);
      measureHoverPill(key);
    },
    [measureHoverPill],
  );

  useLayoutEffect(() => {
    if (navHover == null) return;
    measureHoverPill(navHover);

    const frame = requestAnimationFrame(() => measureHoverPill(navHover));
    return () => cancelAnimationFrame(frame);
  }, [
    breakpoint,
    leadIcon,
    measureHoverPill,
    navHover,
    pathname,
    showHomeIcon,
    stuck,
  ]);

  useLayoutEffect(() => {
    if (navHover == null || typeof ResizeObserver === 'undefined') return;

    const c = navClusterRef.current;
    const target = navItemRefs.current[navHover];
    if (!c || !target) return;

    const observer = new ResizeObserver(() => measureHoverPill(navHover));
    observer.observe(c);
    observer.observe(target);
    return () => observer.disconnect();
  }, [measureHoverPill, navHover, showHomeIcon]);

  const leadAriaLabel =
    leadIcon === 'arrow'
      ? isHome
        ? 'Back to top'
        : 'Back'
      : isHome
        ? 'Back to top'
        : 'Home';

  const leadArrowRotate = leadIcon === 'arrow' && !isHome ? -90 : 0;

  const clearNavHover = useCallback(() => {
    setNavHover(null);
    setHoverPillRect(null);
  }, []);

  const handleHomeButtonClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      cancelScrollRef.current?.();
      clearNavHover();

      if (isHome) {
        cancelScrollRef.current = smoothScrollTo(0);
        window.history.replaceState(null, '', '/');
      } else {
        navigate({ to: '/' });
      }
    },
    [clearNavHover, isHome, navigate],
  );

  const handleWorkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      cancelScrollRef.current?.();
      clearNavHover();

      if (isHome) {
        const target = document.getElementById('work');
        if (!target) return;
        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          NAV_HEIGHT_OFFSET;
        cancelScrollRef.current = smoothScrollTo(top);
        window.history.replaceState(null, '', '#work');
      } else {
        // SPA-navigate so SiteNav stays mounted and animates smoothly to its
        // home-state. The home page is responsible for jumping to #work on
        // mount when the hash is present.
        navigate({ to: '/', hash: 'work' });
      }
    },
    [clearNavHover, isHome, navigate],
  );

  const handleAboutClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      cancelScrollRef.current?.();
      clearNavHover();
      navigate({ to: '/about' });
    },
    [clearNavHover, navigate],
  );

  const heroInitial = reduceMotion
    ? false
    : { opacity: 0, filter: 'blur(12px)', y: 8 };
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  const hoverPillTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: 420,
        damping: 38,
        mass: 0.45,
      };
  const hoverPillPresenceTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: [0.2, 0, 0, 1] as const };
  const isDarkNav = navTheme === 'dark';
  const navTextClass = isDarkNav ? 'text-white/90' : 'text-black/80';
  const hoverPillClass = isDarkNav ? 'bg-white/15' : 'bg-white/70';
  const activeHoverTextClass = isDarkNav ? 'text-white' : 'text-black';

  return (
    <>
    <motion.nav
      style={{ top: navTop }}
      className={`fixed left-[calc(--spacing(6)-18px)] z-50 flex items-center text-xl font-medium uppercase leading-8 md:left-[calc(--spacing(14)-18px)] xl:left-[calc(--spacing(20)-18px)] 2xl:left-[calc((100vw-1536px)/2-18px)] ${navTextClass}`}
    >
      <div className="relative inline-flex min-h-12 items-center">
        <motion.div
          aria-hidden="true"
          data-theme={navTheme}
          className="liquid-glass-capsule pointer-events-none absolute inset-0 z-0"
          initial={false}
          animate={{
            opacity: pillVisible ? 1 : 0,
            scale: pillVisible ? 1 : 0.92,
          }}
          transition={{
            // Opacity must not ease in on show: animating opacity on a layer with
            // backdrop-filter makes the frosted blur ramp up slowly (browser
            // composites blur * opacity). Hide can still fade out.
            opacity: {
              duration: pillVisible ? 0 : 0.22,
              ease: [0.2, 0, 0, 1],
            },
            scale: reduceMotion
              ? { duration: 0 }
              : {
                  duration: pillVisible ? 0.36 : 0.28,
                  ease: [0.2, 0, 0, 1],
                },
          }}
        />
        <motion.div
          ref={navClusterRef}
          layout
          className="relative z-10 flex items-center gap-0 p-1"
          initial={heroInitial}
          animate={heroAnimate}
          transition={{
            type: 'spring',
            duration: 0.7,
            bounce: 0,
            layout: navSpring,
          }}
          onMouseLeave={() => {
            setNavHover(null);
            setHoverPillRect(null);
          }}
        >
          <AnimatePresence>
            {hoverPillRect != null ? (
              <motion.div
                aria-hidden
                className={`pointer-events-none absolute z-0 rounded-full ${hoverPillClass}`}
                initial={{
                  left: hoverPillRect.left,
                  top: hoverPillRect.top,
                  width: hoverPillRect.width,
                  height: hoverPillRect.height,
                  opacity: 0,
                  scale: 0.72,
                }}
                animate={{
                  left: hoverPillRect.left,
                  top: hoverPillRect.top,
                  width: hoverPillRect.width,
                  height: hoverPillRect.height,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.72 }}
                transition={{
                  left: hoverPillTransition,
                  top: hoverPillTransition,
                  width: hoverPillTransition,
                  height: hoverPillTransition,
                  opacity: hoverPillPresenceTransition,
                  scale: hoverPillPresenceTransition,
                }}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence initial={false} mode="popLayout">
            {showHomeIcon && (
              <motion.a
                key="home"
                ref={(node) => {
                  navItemRefs.current.lead = node;
                }}
                layout
                href="/"
                aria-label={leadAriaLabel}
                onClick={handleHomeButtonClick}
                onMouseEnter={() => handleNavItemEnter('lead')}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                transition={{
                  ...navSpring,
                  opacity: { duration: 0.3, ease: [0.2, 0, 0, 1] },
                  layout: { ...navSpring, delay: 0 },
                }}
                style={{ originX: 0.5 }}
                className={`relative z-10 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full ${
                  navHover === 'lead' ? activeHoverTextClass : ''
                }`}
              >
                {leadIcon === 'arrow' ? (
                  <motion.span
                    className="inline-flex will-change-transform"
                    animate={{ rotate: leadArrowRotate }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.35,
                            ease: [0.2, 0, 0, 1],
                          }
                    }
                  >
                    <ArrowUp size={20} aria-hidden />
                  </motion.span>
                ) : (
                  <HomeIcon size={20} />
                )}
              </motion.a>
            )}
          </AnimatePresence>

          <motion.a
            ref={(node) => {
              navItemRefs.current.work = node;
            }}
            layout
            href={isHome ? '#work' : '/#work'}
            onClick={handleWorkClick}
            onMouseEnter={() => handleNavItemEnter('work')}
            whileTap={{ scale: 0.96 }}
            transition={{
              ...navSpring,
              layout: { ...navSpring, delay: workLayoutDelay },
            }}
            className={`relative z-10 inline-flex h-10 cursor-pointer items-center rounded-full px-3.5 uppercase ${
              navHover === 'work' ? activeHoverTextClass : ''
            }`}
          >
            Work
          </motion.a>

          <motion.a
            ref={(node) => {
              navItemRefs.current.about = node;
            }}
            layout
            href="/about"
            onClick={handleAboutClick}
            onMouseEnter={() => handleNavItemEnter('about')}
            whileTap={{ scale: 0.96 }}
            transition={{
              ...navSpring,
              layout: { ...navSpring, delay: aboutLayoutDelay },
            }}
            className={`relative z-10 inline-flex h-10 cursor-pointer items-center rounded-full px-3.5 uppercase ${
              navHover === 'about' ? activeHoverTextClass : ''
            }`}
          >
            About
          </motion.a>
        </motion.div>
      </div>
    </motion.nav>
    {showNavTuner ? (
      <NavJumpThresholdTuner
        threshold={jumpThreshold}
        onThresholdChange={handleJumpThresholdChange}
        programmaticTick={programmaticTick}
        programmaticUntilRef={programmaticUntilRef}
      />
    ) : null}
    </>
  );
}

function NavJumpThresholdTuner({
  threshold,
  onThresholdChange,
  programmaticTick,
  programmaticUntilRef,
}: {
  threshold: number;
  onThresholdChange: (value: number) => void;
  programmaticTick: number;
  programmaticUntilRef: React.RefObject<number>;
}) {
  const [lastDy, setLastDy] = useState(0);
  const [maxDy, setMaxDy] = useState(0);
  const [programmaticActive, setProgrammaticActive] = useState(false);

  useEffect(() => {
    let prevY = window.scrollY;
    const recent: { ts: number; v: number }[] = [];
    let lastUpdate = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const absDy = Math.abs(y - prevY);
      prevY = y;

      const now = performance.now();
      recent.push({ ts: now, v: absDy });
      while (recent.length > 0 && now - recent[0].ts > 2000) {
        recent.shift();
      }

      if (now - lastUpdate > 80) {
        lastUpdate = now;
        setLastDy(absDy);
        setMaxDy(recent.reduce((m, r) => Math.max(m, r.v), 0));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Light up the "Programmatic" pill while the override window is active.
  useEffect(() => {
    const remaining = programmaticUntilRef.current - performance.now();
    if (remaining <= 0) return;
    setProgrammaticActive(true);
    const id = window.setTimeout(
      () => setProgrammaticActive(false),
      remaining,
    );
    return () => window.clearTimeout(id);
  }, [programmaticTick, programmaticUntilRef]);

  const lastIsJump = lastDy > threshold;
  const maxIsJump = maxDy > threshold;

  return (
    <div className="fixed bottom-6 right-6 z-100 flex w-72 flex-col gap-3 rounded-2xl border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-white/70">
          Nav jump threshold
        </span>
        <span className="font-mono text-sm tabular-nums">{threshold}px</span>
      </div>
      <input
        type="range"
        min={20}
        max={1000}
        step={10}
        value={threshold}
        onChange={(event) => onThresholdChange(Number(event.target.value))}
        className="w-full accent-orange-400"
      />
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-white/60">Last |dy|</span>
          <span
            className={`font-mono text-sm tabular-nums ${
              lastIsJump ? 'text-orange-400' : 'text-white'
            }`}
          >
            {Math.round(lastDy)}px
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/60">Max |dy| (2s)</span>
          <span
            className={`font-mono text-sm tabular-nums ${
              maxIsJump ? 'text-orange-400' : 'text-white'
            }`}
          >
            {Math.round(maxDy)}px
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <span className="text-white/60">Programmatic override</span>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide tabular-nums transition-colors ${
            programmaticActive
              ? 'bg-orange-400/20 text-orange-300'
              : 'bg-white/5 text-white/50'
          }`}
        >
          {programmaticActive ? 'Active' : 'Idle'}
        </span>
      </div>
    </div>
  );
}
