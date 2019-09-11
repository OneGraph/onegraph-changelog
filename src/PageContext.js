// @flow

import React from 'react';

const hasDoc = typeof document !== 'undefined';
let linkEl;

type T = {
  setTitle: (title: string) => void,
  setDescription: (description: string) => void,
  setFavicon: (favicon: string) => void,
};

export default React.createContext<T>({
  setTitle: (title: string) => {
    if (hasDoc) {
      document.title = title;
    }
  },
  setFavicon: (faviconUrl: string) => {
    if (hasDoc) {
      if (!linkEl) {
        const head = document.getElementsByTagName('head')[0];
        linkEl = document.createElement('link');
        linkEl.type = 'image/x-icon';
        linkEl.rel = 'icon';

        // remove existing favicons
        var links = head.getElementsByTagName('link');
        for (var i = links.length; --i >= 0; ) {
          if (/\bicon\b/i.test(links[i].getAttribute('rel') || '')) {
            head.removeChild(links[i]);
          }
        }
        head.appendChild(linkEl);
      }
      linkEl.href = faviconUrl;
    }
  },
  setDescription: (description: string) => undefined,
});
