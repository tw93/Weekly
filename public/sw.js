const CACHE_NAME = "weekly-cache-v1";
// Issue pages go to the network first and fall back to the cache only when
// it fails. Each issue page carries the whole issue list in its sidebar, so a
// cached copy served first hid every issue published since (290 missing from
// 289's sidebar, 2026-11-17); clicks stay fast through hover prerendering.
const PAGE_CACHE = "weekly-pages-v1";
const PAGE_CACHE_LIMIT = 40;
const ISSUE_PAGE = /^\/(?:en\/)?posts\/\d+$/;
const FONT_BASE_URL = "https://gw.alipayobjects.com/os/k/jinkai/";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== PAGE_CACHE) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

const trimPageCache = async (cache) => {
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - PAGE_CACHE_LIMIT)).map((key) => cache.delete(key)));
};

const servePage = async (event) => {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(event.request);
    // Redirected responses cannot answer a navigation, so never store them.
    if (response.ok && !response.redirected) {
      const copy = response.clone();
      event.waitUntil(
        cache
          .delete(event.request, { ignoreSearch: true })
          .then(() => cache.put(event.request, copy))
          .then(() => trimPageCache(cache)),
      );
    }
    return response;
  } catch (error) {
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    throw error;
  }
};

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  const { origin, pathname } = new URL(url);

  if (event.request.mode === "navigate" && origin === self.location.origin && ISSUE_PAGE.test(pathname)) {
    event.respondWith(servePage(event));
    return;
  }
  const isImmutableAsset = url.startsWith(FONT_BASE_URL) || url.includes("/fonts/jinkai.css");

  if (isImmutableAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            (response.type !== "cors" && response.type !== "basic")
          ) {
            return response;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      }),
    );
  }
});
