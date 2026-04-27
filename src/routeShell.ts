/** Page shell behind content — keep in sync with `RouteBackground` in `router.tsx`. */
export const ROUTE_SHELL_WARM = '#F0EDED';

/**
 * `RouteBackground` motion `transition.duration` (seconds) for warm ⟷ about black.
 * About page entrance must not start before this elapses (esp. from light pages).
 */
export const ROUTE_BG_CROSSFADE_S = 0.45;
