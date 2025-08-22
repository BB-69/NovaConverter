/* ---UPDATE VERSION HERE--- */
const APP_VERSION = "1.0.12";

document.addEventListener("DOMContentLoaded", () => {
  // Auto-append version query to CSS + JS assets
  document.querySelectorAll('link[rel="stylesheet"], script[data-versioned]').forEach(el => {
    const attr = el.tagName === "LINK" ? "href" : "src";
    el.setAttribute(attr, el.getAttribute(attr) + "?v=" + APP_VERSION);
  });

  // Update footer version text
  const footer = document.querySelector("footer");
  if (footer) footer.innerHTML = `Made by The [ MAOU ] — v${APP_VERSION}`;

  // Update <title> with version
  const titleEl = document.querySelector("title");
  if (titleEl) {
    const baseTitle = titleEl.textContent.replace(/ v[\d.]+$/, ""); 
    titleEl.textContent = `${baseTitle} v${APP_VERSION}`;
  }
});
