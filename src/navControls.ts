export type NavTheme = 'light' | 'dark';

const programmaticListeners = new Set<(durationMs?: number) => void>();
const scrollCancelListeners = new Set<() => void>();
const navThemeOverrideListeners = new Set<(theme: NavTheme | null) => void>();

let navThemeOverride: NavTheme | null = null;

export function markNavProgrammaticScroll(durationMs?: number) {
  programmaticListeners.forEach((fn) => fn(durationMs));
}

export function subscribeNavProgrammaticScroll(fn: (durationMs?: number) => void) {
  programmaticListeners.add(fn);
  return () => {
    programmaticListeners.delete(fn);
  };
}

export function cancelNavScrollAnimation() {
  scrollCancelListeners.forEach((fn) => fn());
}

export function subscribeNavScrollCancel(fn: () => void) {
  scrollCancelListeners.add(fn);
  return () => {
    scrollCancelListeners.delete(fn);
  };
}

export function getNavThemeOverride() {
  return navThemeOverride;
}

export function setNavThemeOverride(theme: NavTheme | null) {
  navThemeOverride = theme;
  navThemeOverrideListeners.forEach((fn) => fn(theme));
}

export function subscribeNavThemeOverride(
  fn: (theme: NavTheme | null) => void,
) {
  navThemeOverrideListeners.add(fn);
  return () => {
    navThemeOverrideListeners.delete(fn);
  };
}
