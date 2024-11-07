'use strict'; ///PSDELETE

/**
 * @param {HTMLIFrameElement} iframe
 */
const iframeResize = debounce((iframe) => {
  iframe.width = window.innerWidth.toString();
  iframe.height = window.innerHeight.toString();
}, 250);

window.addEventListener('load', () => {
  const IFRAME = document.querySelector('iframe');

  window.addEventListener('resize', () => {
    iframeResize(IFRAME);
  });

  iframeResize(IFRAME);
});
