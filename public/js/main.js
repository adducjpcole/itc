'use strict';

window.addEventListener('load', () => {
  const iframe = document.getElementsByTagName('iframe')[0];

  const handleResize = GLOBAL_debounce(() => {
    iframe.width = window.innerWidth.toString();
    iframe.height = window.innerHeight.toString();
  }, 250);
  window.addEventListener('resize', handleResize);
  handleResize();

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
