import {
  createRouter,
  createRootRoute,
  createRoute,
  lazyRouteComponent,
  Outlet,
} from '@tanstack/react-router';
import Home from './pages/Home';
import LightboxProvider from './components/Lightbox';

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
const EmbeddingModels = lazyRouteComponent(
  () => import('./pages/projects/EmbeddingModels'),
);
const CommunityCrisis = lazyRouteComponent(
  () => import('./pages/projects/CommunityCrisis'),
);

const rootRoute = createRootRoute({
  component: () => (
    <LightboxProvider>
      <Outlet />
    </LightboxProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
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
  designSystemRoute,
  maltedPulseRoute,
  maltedSRMRoute,
  bridgingDesignDevRoute,
  bridgingDesignDevV2Route,
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
