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
  AnimatePresence,
  motion,
  stagger,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  getNavThemeOverride,
  subscribeNavProgrammaticScroll,
  subscribeNavScrollCancel,
  subscribeNavThemeOverride,
  type NavTheme,
} from '../navControls';
import { ROUTE_BG_CROSSFADE_S } from '../routeShell';
import { smoothScrollTo } from '../utils/smoothScroll';
import { getWorkScrollOffset } from '../utils/workScroll';

const navSpring = {
  type: 'spring' as const,
  stiffness: 215,
  damping: 12.5,
  mass: 0.5,
};

type NumericMotionValue = {
  get: () => number;
  set: (latest: number) => void;
};

type NavTopAnimation = {
  stop: () => void;
  getVelocity: () => number;
};

const NAV_SPRING_MAX_VISIBLE_DT_MS = 1000 / 60;
const NAV_SPRING_REST_SPEED = 2;
const NAV_SPRING_REST_DELTA = 0.5;

function createNavSpringResolver({
  from,
  to,
  velocity = 0,
}: {
  from: number;
  to: number;
  velocity?: number;
}) {
  const stiffness = navSpring.stiffness;
  const damping = navSpring.damping;
  const mass = navSpring.mass;
  const initialDelta = to - from;

  if (Math.abs(initialDelta) <= NAV_SPRING_REST_DELTA) {
    return {
      next: () => ({ value: to, velocity: 0, done: true }),
    };
  }

  const initialVelocity = -velocity / 1000;
  const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  let resolveSpring: (t: number) => number;
  let resolveVelocity: (t: number) => number;

  if (dampingRatio < 1) {
    const angularFreq =
      undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    const a =
      (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) /
      angularFreq;
    const sinCoeff =
      dampingRatio * undampedAngularFreq * a + initialDelta * angularFreq;
    const cosCoeff =
      dampingRatio * undampedAngularFreq * initialDelta - a * angularFreq;

    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return (
        to -
        envelope *
          (a * Math.sin(angularFreq * t) +
            initialDelta * Math.cos(angularFreq * t))
      );
    };
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return (
        envelope *
        (sinCoeff * Math.sin(angularFreq * t) +
          cosCoeff * Math.cos(angularFreq * t)) *
        1000
      );
    };
  } else if (dampingRatio === 1) {
    const c = initialVelocity + undampedAngularFreq * initialDelta;
    resolveSpring = (t) =>
      to -
      Math.exp(-undampedAngularFreq * t) *
        (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    resolveVelocity = (t) =>
      Math.exp(-undampedAngularFreq * t) *
      (undampedAngularFreq * c * t - initialVelocity) *
      1000;
  } else {
    const dampedAngularFreq =
      undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    const p =
      (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) /
      dampedAngularFreq;
    const sinhCoeff =
      dampingRatio * undampedAngularFreq * p -
      initialDelta * dampedAngularFreq;
    const coshCoeff =
      dampingRatio * undampedAngularFreq * initialDelta -
      p * dampedAngularFreq;

    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return (
        to -
        (envelope *
          ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) *
            Math.sinh(freqForT) +
            dampedAngularFreq *
              initialDelta *
              Math.cosh(freqForT))) /
          dampedAngularFreq
      );
    };
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return (
        envelope *
        (sinhCoeff * Math.sinh(freqForT) +
          coshCoeff * Math.cosh(freqForT)) *
        1000
      );
    };
  }

  return {
    next: (elapsedMs: number) => {
      const value = resolveSpring(elapsedMs);
      const currentVelocity = resolveVelocity(elapsedMs);
      const done =
        Math.abs(currentVelocity) <= NAV_SPRING_REST_SPEED &&
        Math.abs(to - value) <= NAV_SPRING_REST_DELTA;

      return {
        value: done ? to : value,
        velocity: done ? 0 : currentVelocity,
        done,
      };
    },
  };
}

function springNavTopTo(
  value: NumericMotionValue,
  target: number,
  initialVelocity = 0,
): NavTopAnimation {
  const resolver = createNavSpringResolver({
    from: value.get(),
    to: target,
    velocity: initialVelocity,
  });
  let frame: number | null = null;
  let stopped = false;
  let elapsedMs = 0;
  let lastTimestamp = performance.now();
  let latestVelocity = initialVelocity;

  const step = (timestamp: number) => {
    if (stopped) return;

    const dt = Math.min(
      Math.max(timestamp - lastTimestamp, 0),
      NAV_SPRING_MAX_VISIBLE_DT_MS,
    );
    lastTimestamp = timestamp;
    elapsedMs += dt;

    const next = resolver.next(elapsedMs);
    latestVelocity = next.velocity;
    value.set(next.value);

    if (next.done) {
      frame = null;
      return;
    }

    frame = requestAnimationFrame(step);
  };

  frame = requestAnimationFrame(step);

  return {
    stop: () => {
      stopped = true;
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    },
    getVelocity: () => latestVelocity,
  };
}

/** Interval between each nav item’s layout shift (lead → Work → About). */
const NAV_CLUSTER_LAYOUT_STAGGER_S = 0.029;
const NAV_PILL_AFTER_MOVEMENT_DELAY_S = 0.26;

/** Default jump threshold (px). The tuner overlay can override this at runtime
 *  without remounting the scroll listener (see `jumpThresholdRef`). */
const NAV_JUMP_THRESHOLD_PX = 600;

/** When a scroll is flagged as programmatic, the next scroll events within
 *  this window are classified as jumps regardless of `|dy|`. The window has
 *  to be long enough to cover scroll-restoration + a follow-up scrollTo
 *  (Home's `#work` jump can land in two events), but short enough that real
 *  user input that immediately follows is not misclassified. */
const NAV_PROGRAMMATIC_WINDOW_MS = 200;

/**
 * SiteNav subscribes to navControls so external callers can flag upcoming
 * scroll changes as programmatic or cancel nav-owned smooth scrolls before
 * route navigation starts.
 */
let hasPlayedNavEntry = false;

/**
 * Vertical positions per breakpoint, in px — also tune hero `padding-top` /
 * section gaps on Home + shells; nav offset alone is not enough.
 *
 *   - `xl` (Tailwind 1280–1535): tighter rail when the layout still breathes in px.
 *   - `2xl` (1536+): generous top — wide monitors; do not shrink this when tuning xl.
 *   - initialTop aligns with Home LinkedIn (`top-16` / `md:top-12` / `xl:top-16` / `2xl:top-30`).
 *   - stuckTop is the pinned inset — always **24px** (`top-6`), same as the
 *     original 2xl sticky design, regardless of initialTop / breakpoint.
 *
 * The nav linearly slides between these two via scroll position so it feels
 * like a sticky element without actually being sticky in the DOM (the nav is
 * persistent at the root of the app, so CSS sticky cannot work here).
 */
/** Pinned `y` when scrolled — matches original wide layout (`top-6`). */
const NAV_STUCK_TOP_PX = 24;

const NAV_BREAKPOINTS = {
  sm: { initialTop: 64, stuckTop: NAV_STUCK_TOP_PX },
  /** 768–1279: tighter than `xl` — wider screens get more air below the chrome */
  md: { initialTop: 48, stuckTop: NAV_STUCK_TOP_PX },
  /** 1280–1535 (mouse): roomier resting rail than `md` */
  xl: { initialTop: 64, stuckTop: NAV_STUCK_TOP_PX },
  /** 1536+: full desktop — generous nav top on large monitors */
  '2xl': { initialTop: 120, stuckTop: NAV_STUCK_TOP_PX },
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
  // Tailwind `2xl` (1536px+): mouse-first desktops / very wide viewports — own vertical rail.
  if (window.matchMedia('(min-width: 1536px)').matches) {
    return '2xl';
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    // iPad Pro (and similar) are ≥1280px wide in landscape but should not use the
    // xl desktop rail — coarse pointer distinguishes touch-first from mouse-first.
    if (window.matchMedia('(pointer: coarse)').matches) return 'md';
    return 'xl';
  }
  if (window.matchMedia('(min-width: 768px)').matches) return 'md';
  return 'sm';
}

/** Theme sampling via IntersectionObserver against a top-of-viewport band that
 *  spans every possible nav vertical resting position. When a `[data-nav-theme]`
 *  element enters that band, it becomes a candidate for the nav backdrop;
 *  the topmost candidate wins. No per-scroll DOM hit-test. */
const NAV_THEME_BAND_TOP_PX = NAV_STUCK_TOP_PX;
const NAV_THEME_BAND_BOTTOM_PX = NAV_BREAKPOINTS['2xl'].initialTop + 48;

function useNavTheme(
  navClusterRef: React.RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  const [theme, setTheme] = useState<NavTheme>(
    getNavThemeOverride() ?? 'light',
  );
  const themeSnapshotRef = useRef(theme);
  const [overrideVersion, setOverrideVersion] = useState(0);
  const overrideRef = useRef<NavTheme | null>(getNavThemeOverride());

  useLayoutEffect(() => {
    themeSnapshotRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const onOverrideChange = (nextOverride: NavTheme | null) => {
      overrideRef.current = nextOverride;
      setOverrideVersion((version) => version + 1);
      if (nextOverride !== null) setTheme(nextOverride);
    };

    return subscribeNavThemeOverride(onOverrideChange);
  }, []);

  useLayoutEffect(() => {
    if (overrideRef.current !== null) {
      const o = overrideRef.current;
      if (o !== themeSnapshotRef.current) setTheme(o);
      return;
    }

    const intersecting = new Map<Element, NavTheme>();
    let observer: IntersectionObserver | null = null;
    let resizeFrame: number | null = null;

    const themeOf = (el: Element): NavTheme =>
      (el as HTMLElement).dataset.navTheme === 'dark' ? 'dark' : 'light';

    const recompute = () => {
      let bestTheme: NavTheme = 'light';
      let bestTop = Infinity;
      for (const [el, t] of intersecting) {
        const top = el.getBoundingClientRect().top;
        if (top < bestTop) {
          bestTop = top;
          bestTheme = t;
        }
      }
      if (bestTheme !== themeSnapshotRef.current) setTheme(bestTheme);
    };

    const setupObserver = () => {
      observer?.disconnect();
      intersecting.clear();

      const vh = window.innerHeight;
      const bottomInset = Math.max(0, vh - NAV_THEME_BAND_BOTTOM_PX);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              intersecting.set(entry.target, themeOf(entry.target));
            } else {
              intersecting.delete(entry.target);
            }
          }
          recompute();
        },
        { rootMargin: `-${NAV_THEME_BAND_TOP_PX}px 0px -${bottomInset}px 0px` },
      );

      const navRoot = navClusterRef.current?.closest('nav');
      const themed = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      themed.forEach((el) => {
        if (navRoot?.contains(el)) return;
        observer!.observe(el);
      });

      // Synchronous seed: avoid a flash of `light` on routes that should be
      // dark, since IntersectionObserver's first callback fires asynchronously.
      themed.forEach((el) => {
        if (navRoot?.contains(el)) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > NAV_THEME_BAND_TOP_PX && r.top < NAV_THEME_BAND_BOTTOM_PX) {
          intersecting.set(el, themeOf(el));
        }
      });
      recompute();
    };

    setupObserver();

    const onResize = () => {
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        setupObserver();
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer?.disconnect();
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', onResize);
    };
  }, [navClusterRef, overrideVersion, pathname]);

  return { theme };
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
  const pathname = useRouterState({
    select: (s) => s.resolvedLocation?.pathname ?? s.location.pathname,
  });
  const hash = useRouterState({
    select: (s) => s.resolvedLocation?.hash ?? s.location.hash,
  });
  const isHome = pathname === '/';

  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');
  const [stuck, setStuck] = useState(false);
  const [isRouteThemeTransitioning, setIsRouteThemeTransitioning] =
    useState(false);
  const [delayPillEntranceForMovement, setDelayPillEntranceForMovement] =
    useState(false);
  const [navHover, setNavHover] = useState<NavHoverKey | null>(null);
  const [hoverPillRect, setHoverPillRect] = useState<NavHoverPillRect | null>(
    null,
  );
  const navClusterRef = useRef<HTMLDivElement | null>(null);
  const { theme: navTheme } = useNavTheme(
    navClusterRef,
    pathname,
  );
  const navItemRefs = useRef<Record<NavHoverKey, HTMLAnchorElement | null>>({
    lead: null,
    work: null,
    about: null,
  });
  const navTop = useMotionValue<number>(NAV_BREAKPOINTS.sm.initialTop);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const pillMovementDelayTimerRef = useRef<number | null>(null);
  const [shouldPlayNavEntry] = useState(() => !hasPlayedNavEntry);

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
    const coarseMq = window.matchMedia('(pointer: coarse)');
    coarseMq.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      coarseMq.removeEventListener('change', update);
    };
  }, []);

  const previousPathnameRef = useRef(pathname);
  const previousNavThemeRef = useRef<NavTheme>(navTheme);
  const pendingRouteThemeCheckRef = useRef(false);
  const pendingRouteThemeClearRef = useRef<number | null>(null);
  const routeThemeTransitionTimerRef = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    pendingRouteThemeCheckRef.current = true;
    if (pendingRouteThemeClearRef.current !== null) {
      window.clearTimeout(pendingRouteThemeClearRef.current);
    }
    pendingRouteThemeClearRef.current = window.setTimeout(() => {
      pendingRouteThemeCheckRef.current = false;
      pendingRouteThemeClearRef.current = null;
    }, ROUTE_BG_CROSSFADE_S * 1000);

    return () => {
      if (pendingRouteThemeClearRef.current !== null) {
        window.clearTimeout(pendingRouteThemeClearRef.current);
        pendingRouteThemeClearRef.current = null;
      }
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (previousNavThemeRef.current === navTheme) return;

    const changedThemeDuringRouteChange = pendingRouteThemeCheckRef.current;
    previousNavThemeRef.current = navTheme;
    pendingRouteThemeCheckRef.current = false;
    if (pendingRouteThemeClearRef.current !== null) {
      window.clearTimeout(pendingRouteThemeClearRef.current);
      pendingRouteThemeClearRef.current = null;
    }

    if (!changedThemeDuringRouteChange) return;

    setIsRouteThemeTransitioning(true);
    if (routeThemeTransitionTimerRef.current !== null) {
      window.clearTimeout(routeThemeTransitionTimerRef.current);
    }
    routeThemeTransitionTimerRef.current = window.setTimeout(
      () => setIsRouteThemeTransitioning(false),
      ROUTE_BG_CROSSFADE_S * 1000,
    );
    return () => {
      if (routeThemeTransitionTimerRef.current !== null) {
        window.clearTimeout(routeThemeTransitionTimerRef.current);
        routeThemeTransitionTimerRef.current = null;
      }
    };
  }, [navTheme]);

  // Register the imperative API.
  useEffect(() => {
    const mark = (durationMs = NAV_PROGRAMMATIC_WINDOW_MS) => {
      programmaticUntilRef.current = performance.now() + durationMs;
      setProgrammaticTick((n) => n + 1);
    };
    const cancelActiveScroll = () => {
      cancelScrollRef.current?.();
      cancelScrollRef.current = null;
    };
    const unsubscribeProgrammatic = subscribeNavProgrammaticScroll(mark);
    const unsubscribeCancel = subscribeNavScrollCancel(cancelActiveScroll);
    return () => {
      unsubscribeProgrammatic();
      unsubscribeCancel();
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
    cancelScrollRef.current?.();
    cancelScrollRef.current = null;
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
    let inflight: NavTopAnimation | null = null;
    let lastStuck = prevY >= stickPoint;

    // Sync immediately on mount and breakpoint change.
    navTop.set(computeNavTop(prevY));
    setStuck(lastStuck);

    const onScroll = () => {
      const y = window.scrollY;
      const nextStuck = y >= stickPoint;
      if (nextStuck !== lastStuck) {
        lastStuck = nextStuck;
        setStuck(nextStuck);
      }

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
        // In-page programmatic jumps (smoothScrollTo, large user scroll
        // bursts) — coalesce a series of jumps into one spring to the final
        // resting position.
        if (settleTimer !== null) window.clearTimeout(settleTimer);
        inflight?.stop();
        inflight = null;

        settleTimer = window.setTimeout(() => {
          const target = computeNavTop(window.scrollY);
          inflight = springNavTopTo(navTop, target);
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

  // `/#work` should force the stuck treatment once we have landed at the work
  // section, but not after the user scrolls back to the top. Keeping this tied
  // to `stuck` avoids mutating the URL mid-scroll just to clear the hash.
  const isWorkDestination =
    isHome && (hash === 'work' || hash === '#work') && stuck;
  // While a non-home → /#work navigation is mid-flight, the new pathname
  // commits before Home's scrollTo runs. In that window stuck is still false,
  // so without this guard `showHomeIcon` flips false → true once the scroll
  // lands — the lead exits, Work/About slide left, then everything snaps
  // back. delayPillEntranceForMovement is already true for exactly this
  // window, so we reuse it to lock the destination state.
  const destinationStuck =
    stuck || isWorkDestination || delayPillEntranceForMovement;
  const pillVisible = destinationStuck;
  const showHomeIcon = !isHome || destinationStuck;

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

  const delayPillUntilMovementSettles = useCallback(() => {
    setDelayPillEntranceForMovement(true);
    if (pillMovementDelayTimerRef.current !== null) {
      window.clearTimeout(pillMovementDelayTimerRef.current);
    }
    pillMovementDelayTimerRef.current = window.setTimeout(() => {
      setDelayPillEntranceForMovement(false);
      pillMovementDelayTimerRef.current = null;
    }, NAV_PILL_AFTER_MOVEMENT_DELAY_S * 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (pillMovementDelayTimerRef.current !== null) {
        window.clearTimeout(pillMovementDelayTimerRef.current);
      }
    };
  }, []);

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
          getWorkScrollOffset();
        cancelScrollRef.current = smoothScrollTo(top);
        window.history.replaceState(null, '', '#work');
      } else {
        // SPA-navigate so SiteNav stays mounted and animates smoothly to its
        // home-state. The home page is responsible for jumping to #work on
        // mount when the hash is present.
        delayPillUntilMovementSettles();
        // Avoid TanStack scroll restoration + handleHashScroll (scrollIntoView)
        // racing Home's layout scrollTo. Safari often snaps filter/blur mid-spring
        // when a second scroll runs after the grid reveal starts.
        navigate({
          to: '/',
          hash: 'work',
          resetScroll: false,
          hashScrollIntoView: false,
        });
      }
    },
    [clearNavHover, delayPillUntilMovementSettles, isHome, navigate],
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
    : shouldPlayNavEntry
      ? { opacity: 0, filter: 'blur(12px)', y: 8 }
      : false;
  const heroAnimate = reduceMotion
    ? undefined
    : { opacity: 1, filter: 'blur(0px)', y: 0 };

  useEffect(() => {
    hasPlayedNavEntry = true;
  }, []);

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
  // Hover pill is rendered as three opaque-white pieces inside a wrapper that
  // carries the translucency. Compositing the whole group at the wrapper
  // collapses any cap/bar overlap or anti-aliased seam into a single flat
  // alpha — eliminates the dark band that appears when each piece is
  // independently translucent.
  const hoverPillAlpha = isDarkNav ? 0.15 : 0.7;
  const activeHoverTextClass = isDarkNav ? 'text-white' : 'text-black';
  const pillEntranceDelay =
    pillVisible && delayPillEntranceForMovement
      ? NAV_PILL_AFTER_MOVEMENT_DELAY_S
      : 0;

  return (
    <>
    <motion.nav
      layoutScroll
      style={{ y: navTop }}
      className={`fixed top-0 left-[calc(--spacing(10)-18px)] z-50 flex items-center text-xl font-medium uppercase leading-8 will-change-transform lg:left-[calc(--spacing(20)-18px)] 2xl:left-[calc(max(5rem,calc((100vw-1536px)/2))-18px)] ${navTextClass}`}
    >
      <div className="relative inline-flex min-h-12 items-center">
        <motion.div
          aria-hidden="true"
          data-theme={navTheme}
          className="liquid-glass-capsule pointer-events-none absolute inset-0 z-0 origin-left"
          initial={false}
          animate={{
            opacity: pillVisible ? 1 : 0,
            scale: pillVisible ? 1 : 0.88,
          }}
          transition={{
            opacity: {
              duration: pillVisible
                ? isRouteThemeTransitioning
                  ? 0.4
                  : 0.08
                : 0.22,
              delay: pillEntranceDelay,
              ease: [0.2, 0, 0, 1],
            },
            scale: reduceMotion
              ? { duration: 0 }
              : {
                  duration: pillVisible ? 0.52 : 0.28,
                  delay: pillEntranceDelay,
                  ease: [0.2, 0, 0, 1],
                },
          }}
        >
          <div className="liquid-glass-capsule-surface" />
        </motion.div>
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
                className="pointer-events-none absolute left-0 right-0 z-0"
                style={{ top: hoverPillRect.top, height: hoverPillRect.height }}
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ opacity: hoverPillAlpha, scale: 1 }}
                exit={{ opacity: 0, scale: 0.72 }}
                transition={{
                  opacity: hoverPillPresenceTransition,
                  scale: hoverPillPresenceTransition,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 size-10 rounded-full bg-white will-change-transform"
                  animate={{ x: hoverPillRect.left }}
                  transition={{ x: hoverPillTransition }}
                />
                <motion.div
                  className="absolute top-0 left-0 size-10 rounded-full bg-white will-change-transform"
                  animate={{ x: hoverPillRect.left + hoverPillRect.width - 40 }}
                  transition={{ x: hoverPillTransition }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-10 w-px origin-left bg-white will-change-transform"
                  animate={{
                    x: hoverPillRect.left + 20,
                    scaleX: Math.max(0, hoverPillRect.width - 40),
                  }}
                  transition={{
                    x: hoverPillTransition,
                    scaleX: hoverPillTransition,
                  }}
                />
              </motion.div>
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

    const activateId = window.setTimeout(() => {
      setProgrammaticActive(true);
    }, 0);
    const deactivateId = window.setTimeout(
      () => setProgrammaticActive(false),
      remaining,
    );
    return () => {
      window.clearTimeout(activateId);
      window.clearTimeout(deactivateId);
    };
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
