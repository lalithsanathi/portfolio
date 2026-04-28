const WORK_SCROLL_OFFSET_SM = 80;
const WORK_SCROLL_OFFSET_MD = 96;

export function getWorkScrollOffset() {
  if (typeof window === 'undefined') return WORK_SCROLL_OFFSET_MD;
  return window.matchMedia('(min-width: 768px)').matches
    ? WORK_SCROLL_OFFSET_MD
    : WORK_SCROLL_OFFSET_SM;
}
