'use strict';

SHARED_onReady(() => {
  const iframe = document.getElementsByTagName('iframe')[0];
  iframe.addEventListener('load', () => {
    iframe.classList.remove('loading');

    const handlePagehide = () => {
      iframe.contentWindow?.removeEventListener('pagehide', handlePagehide);
      iframe.classList.add('loading');
    };
    iframe.contentWindow?.addEventListener('pagehide', handlePagehide);
  });

  const anchors = /** @type {NodeListOf<HTMLAnchorElement>}*/ (
    document.querySelectorAll('a[data-trap]')
  );
  for (const a of anchors) {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (iframe.src === a.href) return;

      for (const otherAnchor of anchors) {
        if (otherAnchor === a) continue;

        otherAnchor.classList.remove('selected');
      }

      a.classList.add('selected');

      iframe.src = a.href;
    });
  }
});
