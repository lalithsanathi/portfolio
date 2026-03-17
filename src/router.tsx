import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import Home from './pages/Home';
import DesignSystem from './pages/DesignSystem';
import MaltedPulse from './pages/projects/MaltedPulse';
import MaltedSRM from './pages/projects/MaltedSRM';
import BridgingDesignDev from './pages/projects/BridgingDesignDev';
import EmbeddingModels from './pages/projects/EmbeddingModels';
import CommunityCrisis from './pages/projects/CommunityCrisis';
import LightboxProvider from './components/Lightbox';

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
