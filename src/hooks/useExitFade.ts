import { useEffect, useRef, useState } from 'react';
import { useBlocker } from '@tanstack/react-router';
import { useReducedMotion } from 'motion/react';

export const EXIT_FADE_DURATION_S = 0.18;

/**
 * Intercepts every navigation attempt (link, programmatic, back button) so the
 * page can fade out before the route actually changes. Returns `true` while
 * the fade is in progress; the caller animates `opacity` based on it.
 *
 * The fade is skipped under `prefers-reduced-motion`. `onProceed` runs once
 * per navigation, right before the fade starts — useful for nav-scroll prep
 * that must happen on the outgoing page.
 */
export function useExitFade(onProceed?: () => void): boolean {
  const reduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const onProceedRef = useRef(onProceed);
  onProceedRef.current = onProceed;

  const blocker = useBlocker({
    shouldBlockFn: () => !isExiting,
    withResolver: true,
    disabled: reduceMotion === true,
    enableBeforeUnload: false,
  });

  useEffect(() => {
    if (blocker.status !== 'blocked') return;
    onProceedRef.current?.();
    setIsExiting(true);
    const timer = window.setTimeout(() => {
      blocker.proceed();
    }, EXIT_FADE_DURATION_S * 1000);
    return () => window.clearTimeout(timer);
  }, [blocker]);

  return isExiting;
}
