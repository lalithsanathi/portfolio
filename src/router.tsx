import {
  createRouter,
  createRootRoute,
  createRoute,
  lazyRouteComponent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { motion, useReducedMotion } from 'motion/react';
import Home from './pages/Home';
import About from './pages/About';
import LightboxProvider from './components/Lightbox';
import SiteNav from './components/SiteNav';
import { ROUTE_BG_CROSSFADE_S, ROUTE_SHELL_WARM } from './routeShell';

/** Full-viewport shell so /about (black) and other routes (warm) cross-fade instead of snapping. */
function RouteBackground() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduceMotion = useReducedMotion();
  const isAbout = pathname === '/about';

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      initial={false}
      animate={{
        backgroundColor: isAbout ? '#000000' : ROUTE_SHELL_WARM,
      }}
      transition={{
        duration: reduceMotion ? 0 : ROUTE_BG_CROSSFADE_S,
        ease: [0.2, 0, 0, 1],
      }}
    />
  );
}

function RootLayout() {
  return (
    <LightboxProvider>
      <RouteBackground />
      <div className="relative z-10 min-h-screen">
        <SiteNav />
        <Outlet />
      </div>
    </LightboxProvider>
  );
}

/** Code-split everything except `/` so the first paint does not download all case studies. */
const DesignSystem = lazyRouteComponent(() => import('./pages/DesignSystem'));
const MaltedPulse = lazyRouteComponent(
  () => import('./pages/projects/MaltedPulse'),
);
const MaltedSRM = lazyRouteComponent(() => import('./pages/projects/MaltedSRM'));
const BridgingDesignDev = lazyRouteComponent(
  () => import('./pages/projects/BridgingDesignDev'),
);
const BridgingDesignDevV2 = lazyRouteComponent(
  () => import('./pages/projects/BridgingDesignDevV2'),
);
const NationalGridIntro = lazyRouteComponent(
  () => import('./pages/projects/NationalGridIntro'),
);
const EmbeddingModels = lazyRouteComponent(
  () => import('./pages/projects/EmbeddingModels'),
);
const CommunityCrisis = lazyRouteComponent(
  () => import('./pages/projects/CommunityCrisis'),
);

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const designSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design-system',
  component: DesignSystem,
});

const maltedPulseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/malted-pulse',
  component: MaltedPulse,
});

const maltedSRMRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/malted-srm',
  component: MaltedSRM,
});

const bridgingDesignDevRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/bridging-design-and-dev',
  component: BridgingDesignDev,
});

const bridgingDesignDevV2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/bridging-design-and-dev-v2',
  component: BridgingDesignDevV2,
});

const nationalGridIntroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/national-grid-intro',
  component: NationalGridIntro,
});

const embeddingModelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/embedding-models',
  component: EmbeddingModels,
});

const communityCrisisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/community-crisis',
  component: CommunityCrisis,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  designSystemRoute,
  maltedPulseRoute,
  maltedSRMRoute,
  bridgingDesignDevRoute,
  bridgingDesignDevV2Route,
  nationalGridIntroRoute,
  embeddingModelsRoute,
  communityCrisisRoute,
]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
