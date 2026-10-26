const CACHE_NAME = "weekly-cache-v1";
// Issue pages rarely change after publishing, so repeat visits are served
// from cache at once and refreshed in the background. Home pages stay
// network-first so a newly published issue shows up immediately.
const PAGE_CACHE = "weekly-pages-v1";
const PAGE_CACHE_LIMIT = 40;
const ISSUE_PAGE = /^\/(?:en\/)?posts\/\d+$/;
const FONT_BASE_URL = "https://gw.alipayobjects.com/os/k/jinkai/";
const IMMUTABLE_ASSETS = [
  "https://gw.alipayobjects.com/os/k/s3/lightense.min.js",
  "https://gw.alicdn.com/imgextra/i2/O1CN01m9YYjS1QBeW5DOm3I_!!6000000001938-2-tps-400-400.png",
  "https://gw.alicdn.com/imgextra/i4/O1CN010j3h201UDilmn716N_!!6000000002484-2-tps-1280-640.png",
];

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
  const cached = await cache.match(event.request, { ignoreSearch: true });
  const network = fetch(event.request).then(async (response) => {
    // Redirected responses cannot answer a navigation, so never store them.
    if (response.ok && !response.redirected) {
      await cache.delete(event.request, { ignoreSearch: true });
      await cache.put(event.request, response.clone());
      await trimPageCache(cache);
    }
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => {}));
    return cached;
  }
  return network;
};

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  const { origin, pathname } = new URL(url);

  if (event.request.mode === "navigate" && origin === self.location.origin && ISSUE_PAGE.test(pathname)) {
    event.respondWith(servePage(event));
    return;
  }
  const isImmutableAsset =
    IMMUTABLE_ASSETS.includes(url) ||
    url.startsWith(FONT_BASE_URL) ||
    url.includes("/fonts/jinkai.css");

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
