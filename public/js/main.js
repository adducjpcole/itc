'use strict';

window.addEventListener('load', () => {
  const iframe = document.querySelector('iframe');
  if (!iframe) throw new Error('Cannot find an iframe');

  setListeners_iframe(iframe);

  const anchors = /** @type {NodeListOf<HTMLAnchorElement>}*/ (
    document.querySelectorAll('a[data-trap]')
  );
  for (const a of anchors) {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();

      iframe.src = a.href;
    });
  }
});

/**
 * @param {HTMLIFrameElement} iframe
 */
function setListeners_iframe(iframe) {
  const onresize = GLOBAL_debounce(() => {
    iframe.width = window.innerWidth.toString();
    iframe.height = window.innerHeight.toString();
  }, 250);

  window.addEventListener('resize', onresize);

  onresize();
}
