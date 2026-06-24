const CACHE_NAME = "shalom-v1";

const APP_SHELL = [
  "/",
  "/manifest.json",
  "/icons/web-app-manifest-192x192.png",
  "/icons/web-app-manifest-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => key !== CACHE_NAME)
              .map((key) => caches.delete(key)),
          ),
        ),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();

        const url = new URL(event.request.url);

        const shouldCache =
          url.origin === self.location.origin &&
          (event.request.destination === "document" ||
            event.request.destination === "image" ||
            event.request.destination === "script" ||
            event.request.destination === "style" ||
            url.pathname.endsWith(".json"));

        if (shouldCache) {
          caches.open(CACHE_NAME).then((cache) => {
            const cacheKey =
              event.request.destination === "document"
                ? url.pathname
                : event.request;

            cache.put(cacheKey, responseClone);
          });
        }

        return response;
      })
      .catch(async () => {
        const url = new URL(event.request.url);

        if (event.request.destination === "document") {
          return (
            (await caches.match(url.pathname)) ||
            Response.error()
          );
        }

        return caches.match(event.request);
      }),
  );
});
