'use strict';

SHARED_onReady(() => {
  const iframe = document.getElementsByTagName('iframe')[0];
  iframe.addEventListener('load', () => {
    iframe.classList.remove('loading');

    const handleUnlod = () => {
      iframe.contentWindow?.removeEventListener('unload', handleUnlod);
      iframe.classList.add('loading');
    };
    iframe.contentWindow?.addEventListener('unload', handleUnlod);
  });

  const handleResize = SHARED_debounce(() => {
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

      for (const otherAnchor of anchors) {
        if (otherAnchor === a) continue;

        otherAnchor.classList.remove('selected');
      }
      a.classList.add('selected');

      iframe.src = a.href;
    });
  }
});
