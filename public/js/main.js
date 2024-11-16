'use strict';

window.addEventListener('load', () => {
  const iframe = document.querySelector('iframe');
  if (!iframe) throw new Error('Cannot find an iframe');

  // Capture mousemove
  const onmousemove = (/** @type {MouseEvent} */ ev) => {
    if (ev.clientY > window.innerHeight * 0.95) {
      console.log('bottom!');
    }
  };

  window.addEventListener('mousemove', onmousemove);
  iframe.contentWindow?.addEventListener('mousemove', onmousemove);

  // Capture resize
  window.addEventListener('resize', () => iframeResize(iframe));
  iframeResize(iframe);
});

const iframeResize = GLOBAL_debounce(
  /**
   * @param {HTMLIFrameElement} iframe
   */
  (iframe) => {
    iframe.width = window.innerWidth.toString();
    iframe.height = window.innerHeight.toString();
  },
  250,
);
