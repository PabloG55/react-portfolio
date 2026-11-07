// Ported from sosgps-web lib/keep-place.ts. ES and EN render the same components, so the
// headings and paragraphs line up one to one and the saved index points at the same element.
import { RESTORE_KEY } from "./lang-script";

const SEL = "main :is(h1,h2,h3,h4,h5,h6,p)";

type Place = { i: number; off: number; n: number; f: number; hash: string };

/** Called by the language switch just before it leaves the page. */
export function savePlace() {
  const els = [...document.querySelectorAll<HTMLElement>(SEL)];
  let i = -1;
  let off = 0;
  for (let k = 0; k < els.length; k++) {
    const r = els[k].getBoundingClientRect();
    if (r.height === 0) continue;
    if (r.bottom > 0) { i = k; off = r.top; break; }
  }
  const max = document.documentElement.scrollHeight - innerHeight;
  const place: Place = { i, off, n: els.length, f: max > 0 ? scrollY / max : 0, hash: location.hash };
  try { sessionStorage.setItem(RESTORE_KEY, JSON.stringify(place)); } catch {}
}

/** Called once on load: scroll to the saved element, re-apply while late layout settles (web fonts,
 *  the hero), then show the page. Stops as soon as you scroll yourself. */
export function restorePlace() {
  let raw: string | null = null;
  try { raw = sessionStorage.getItem(RESTORE_KEY); } catch {}
  const root = document.documentElement;
  if (!raw) { root.classList.remove("restoring"); return; }
  let place: Place;
  try { place = JSON.parse(raw); } catch { root.classList.remove("restoring"); return; }
  // The hash travels in the saved place, not the URL, so the browser doesn't run its own jump.
  if (place.hash && !location.hash) history.replaceState(null, "", place.hash);
  let stopped = false;
  const stop = () => { stopped = true; };
  const apply = () => {
    if (stopped) return;
    const els = [...document.querySelectorAll<HTMLElement>(SEL)];
    const el = place.i >= 0 && els.length === place.n ? els[place.i] : undefined;
    const r = el?.getBoundingClientRect();
    const top = r && r.height > 0
      ? r.top + scrollY - place.off
      : place.f * (root.scrollHeight - innerHeight);
    window.scrollTo({ top, behavior: "instant" });
  };
  requestAnimationFrame(() => {
    try { sessionStorage.removeItem(RESTORE_KEY); } catch {}
    apply();
    requestAnimationFrame(apply);
    setTimeout(() => {
      apply();
      root.classList.remove("restoring");
      for (const ev of ["wheel", "touchstart", "keydown"]) addEventListener(ev, stop, { once: true, passive: true });
      document.fonts?.ready.then(apply);
    }, 150);
  });
}
