const staticGithubSearch = "github-search-v1";

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
    caches.open(staticGithubSearch).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
