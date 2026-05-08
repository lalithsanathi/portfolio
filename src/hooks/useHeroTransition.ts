import { useLayoutEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { useProjectTransition } from '../projectTransition';

const HERO_SPRING = {
  type: 'spring' as const,
  duration: 0.5,
  bounce: 0 as const,
};

/**
 * Performs a FLIP animation on a hero image container, morphing it from the
 * bounding rect of the project card that was clicked on the home page.
 *
 * Returns a ref to attach to the hero image wrapper `<div>`.
 * When no card click preceded the navigation (direct URL, reduced-motion),
 * the ref is inert and the element renders normally.
 */
export function useHeroTransition(projectId: string) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { consume } = useProjectTransition();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || reduceMotion) return;

    const source = consume();
    if (!source || source.projectId !== projectId) return;

    // --- Measure ---
    const heroRect = el.getBoundingClientRect();
    const scrollY = window.scrollY;

    // Hero's viewport position *after* scroll restoration resets to 0.
    // Page-position = current-viewport-position + current-scroll.
    // At scroll 0 the viewport position equals the page position.
    const heroFinalLeft = heroRect.left;
    const heroFinalTop = heroRect.top + scrollY;

    const dx = source.rect.left - heroFinalLeft;
    const dy = source.rect.top - heroFinalTop;
    const sx = source.rect.width / heroRect.width;
    const sy = source.rect.height / heroRect.height;

    // --- Invert (set initial transform synchronously, before paint) ---
    el.style.transformOrigin = '0 0';
    el.style.transform = `translate3d(${dx}px,${dy}px,0) scale(${sx},${sy})`;
    el.style.willChange = 'transform';
    el.style.zIndex = '40';

    // --- Play ---
    const controls = animate(
      el,
      { transform: 'translate3d(0,0,0) scale(1,1)' },
      HERO_SPRING,
    );

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.willChange = '';
      el.style.zIndex = '';
    };

    controls.then(cleanup);

    return () => {
      controls.stop();
      cleanup();
    };
    // Mount-only effect — all captured values are refs or stable context fns.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return heroRef;
}
