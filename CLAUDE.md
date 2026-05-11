# Working in this repo

## Testing animation changes — required workflow

**Don't ship animation work without watching it in a real browser.** The Claude Preview MCP and any hidden-tab environment throttle `requestAnimationFrame` and don't deliver scroll events on programmatic scrolls — Motion animations literally don't progress there. Reading inline `style` attributes doesn't show what the user sees either (e.g. a `motion.div` with `layout` can paint at `transform: translateY(-440px)` even though its `style` attribute is unchanged from the previous render). You will conclude a bug is fixed when it isn't.

Use Playwright against a real Chromium build, and combine two passes:

1. **Frame-by-frame screenshots** — what the user actually sees
2. **rAF-driven state trace** — `getComputedStyle` of the animated elements every paint, with timestamps relative to the interaction

Both are needed: frames reveal disappear/reappear/off-screen glitches that don't show in computed styles (because the offscreen element is still rendered, just translated); the state trace reveals which property is responsible (`transform`, `opacity`, `filter`, computed parent state).

### One-time setup

```bash
cd /tmp
npm init -y >/dev/null
npm install playwright
npx playwright install chromium
```

The dev server stays up via Claude Preview at whatever port `preview_list` reports — pass that port to the script.

### Template 1 — frame screenshots around an interaction

```js
// /tmp/anim-frames.mjs
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'node:fs';

rmSync('/tmp/anim-frames', { recursive: true, force: true });
mkdirSync('/tmp/anim-frames', { recursive: true });

const URL = 'http://localhost:PORT';                 // <- preview_list port
const CLIP = { x: 0, y: 0, width: 700, height: 200 }; // <- crop to the area you care about

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(URL, { waitUntil: 'networkidle' });
// ... navigate / scroll to the state immediately before the interaction ...

await page.screenshot({ path: '/tmp/anim-frames/00_pre.png', clip: CLIP });

// Schedule sampling that starts pre-interaction and continues through it.
// `setTimeout(...)` the interaction so frames before AND after are captured.
const trigger = await page.$('SELECTOR');
const samples = (async () => {
  const out = [];
  const start = Date.now();
  for (let i = 0; i < 30; i++) {
    const dt = Date.now() - start;
    out.push(page.screenshot({
      path: `/tmp/anim-frames/${String(i).padStart(2,'0')}_${String(dt).padStart(4,'0')}ms.png`,
      clip: CLIP,
    }));
    await new Promise(r => setTimeout(r, 25));
  }
  await Promise.all(out);
})();
setTimeout(() => trigger.click(), 75); // ← so frames 0–2 are pre-click
await samples;
await browser.close();
```

Read the resulting PNGs in order. Look for: complete disappearance, partial render (some children present, others not), elements at unexpected positions, ghost frames where the layout has settled but a `filter: blur` is still painting heavy.

### Template 2 — rAF-driven state trace

```js
// /tmp/anim-state.mjs
import { chromium } from 'playwright';
const URL = 'http://localhost:PORT';

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Hook BEFORE navigate so the rAF loop runs on every paint of every page.
await page.addInitScript(() => {
  window.__trace = [];
  const sample = () => {
    const el = document.querySelector('SELECTOR');
    if (!el) return;
    const cs = getComputedStyle(el);
    window.__trace.push({
      t: performance.now(),
      transform: cs.transform,
      opacity: cs.opacity,
      filter: cs.filter,
      scrollY: window.scrollY,
      path: location.pathname + location.hash,
    });
  };
  const loop = () => { sample(); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
});

await page.goto(URL, { waitUntil: 'networkidle' });
// ... set up state ...
await page.evaluate(() => { window.__clickT = performance.now(); });
await (await page.$('SELECTOR')).click();
await page.waitForTimeout(1500);

const { clickT, trace } = await page.evaluate(() => ({ clickT: window.__clickT, trace: window.__trace }));
const rel = trace.filter(s => s.t >= clickT - 50 && s.t <= clickT + 800);
const compact = [];
for (const s of rel) {
  const last = compact.at(-1);
  if (!last || s.t - last.t > 30 || s.transform !== last.transform || s.path !== last.path) compact.push(s);
}
console.log(JSON.stringify(compact.map(s => ({
  dt: Math.round(s.t - clickT),
  transform: s.transform,
  opacity: s.opacity,
  filter: s.filter,
  scrollY: s.scrollY,
  path: s.path,
})), null, 2));

await browser.close();
```

Read the trace top-to-bottom. Each row is one paint. A bug shows up as a value that jumps unexpectedly between rows. Compare what _should_ be moving (e.g. nav `y`) with what you're seeing.

### Adding temporary instrumentation in the component

For "is this code path even running?" questions, push to a `window.__navDbg` array inside the suspect branch:

```js
(window as unknown as Record<string, unknown>).__navDbg ??= [];
((window as unknown as Record<string, unknown[]>).__navDbg as unknown[]).push({
  t: performance.now(), ev: 'scroll', y, snapUntil: snapUntilRef.current,
});
```

Read it via `page.evaluate(() => window.__navDbg)` after the interaction. **Remove these calls before you ship.**

### Real failure modes this method has caught here

When you see one of these patterns, you've already seen it in this codebase — start with the named fix.

- **Nav appears to "disappear and slide in from above" after a route change.** Motion's `layout` prop measures positions in page coordinates (viewport + `window.scrollY`), so TanStack's scroll-restoration on route change registers as a phantom N-pixel layout shift on every descendant with `layout`. Add `layoutScroll` to the fixed `motion.nav` so Motion ignores window scroll when measuring children. ([SiteNav.tsx:942](src/components/SiteNav.tsx:942))
- **Route navigation that should animate the nav-y instead jumps instantly** (e.g. mid-scroll on home → `/about`). For small `dy`, the scroll listener's jump detection only fires when `isProgrammatic` is true. The `useLayoutEffect(..., [pathname])` that sets `programmaticUntilRef` runs *after* TanStack's scroll event, so the flag is stale at scroll time. Set `programmaticUntilRef` synchronously in the click handler before `navigate()`. ([SiteNav.tsx:`markProgrammatic`](src/components/SiteNav.tsx))
- **Translucent stacked elements show a darker seam at a visible boundary.** If the same color is painted in two abutting (or near-abutting) elements at less-than-full alpha, the anti-aliased edges sum to a higher alpha than the body of either piece. Either move the translucency to the wrapper (so the group composites once at the wrapper's stacking context, flattening overlaps), or arrange the pieces so each pixel is covered exactly once. ([SiteNav.tsx hover pill](src/components/SiteNav.tsx))
- **Bouncy spring with what looks like an oversized travel distance.** Check whether the spring's `from` value is correct at the moment it starts — `useMotionValue` defaults can carry over stale, or another layout system can be adding its own transform on top. The visible "distance" the user sees is `value.set(target) - currentlyPaintedPosition`, not `target - from-state`.

### When not to bother

If the change is purely:
- A typing/lint fix in animation-adjacent code
- A constant tweak you're certain about (e.g. changing `stiffness: 215` → `220`) and you can describe the expected effect in one sentence
- Documentation, comments, types

…just ship it. The workflow is for behavior changes where the answer is "I can't tell from reading the code what the visual result will be."
