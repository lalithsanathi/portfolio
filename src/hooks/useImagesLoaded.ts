import { useLayoutEffect, useState } from 'react';

/**
 * Resolves when every URL has loaded and decoded (onerror still resolves so a broken image does not block UI forever).
 */
export function useImagesLoaded(urls: readonly string[], enabled = true) {
  const hrefKey = urls.join('|');
  const [ready, setReady] = useState(urls.length === 0);

  // `hrefKey` in deps: avoid re-running when callers pass a new array
  // instance with the same URLs; `urls` in the closure is current when the effect runs.
  useLayoutEffect(() => {
    if (!enabled || urls.length === 0) {
      setReady(true);
      return;
    }
    setReady(false);
    let cancelled = false;
    const pending = urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            void img.decode().then(resolve).catch(resolve);
          };
          img.onerror = () => resolve();
          img.src = src;
        }),
    );
    void Promise.all(pending).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, hrefKey]);

  return ready;
}
