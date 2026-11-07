/** The language detector, after sosgps-web's lib/lang-detect.ts with the languages swapped.
 *  It runs inline before the English home page (`/`) paints. A browser whose language list puts
 *  Spanish before English, or has Spanish and no English, goes to `/es`. It never runs once the
 *  reader has picked a language with the switch (stored under LANG_KEY), never on `/es`, and skips
 *  crawlers so search engines index both pages. Browser language, never IP. While it redirects,
 *  the page stays hidden (html.restoring) so the English page never flashes. */
export const LANG_KEY = "pg-lang";

export const LANG_DETECT = `(function(){try{
if(location.pathname!=="/")return;
if(/bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(navigator.userAgent))return;
if(localStorage.getItem("${LANG_KEY}"))return;
var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
for(var i=0;i<ls.length;i++){var l=String(ls[i]).toLowerCase();if(l.indexOf("en")===0)return;if(l.indexOf("es")===0)break;}
if(i===ls.length)return;
document.documentElement.classList.add("restoring");
location.replace("/es"+location.search+location.hash);
}catch(e){}})();`;

/** Switching language keeps your place: the switch saves which heading or paragraph is at the top
 *  of the screen, and the other page hides for a moment, scrolls to the same element and shows
 *  (src/i18n/keep-place.ts). This hides the page before first paint while that is pending. */
export const RESTORE_KEY = "pg-restore";
export const RESTORE_PRE = `(function(){try{if(sessionStorage.getItem("${RESTORE_KEY}")){var d=document.documentElement;d.classList.add("restoring");setTimeout(function(){d.classList.remove("restoring")},1500)}}catch(e){}})();`;
