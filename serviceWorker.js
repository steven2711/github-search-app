const cacheName = "github-search-v1";

const assets = [
  "/",
  "index.html",
  "app.js",
  "github.js",
  "github.json",
  "ui.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("Opened cache...");
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
