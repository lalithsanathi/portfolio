export function smoothScrollTo(targetTop: number, durationMs = 1200) {
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
