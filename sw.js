// Service Worker for Srengenge Website
const CACHE_NAME = "srengenge-v1.0.0";
const urlsToCache = [
  "/",
  "/index-optimized.html",
  "/styles.css",
  "/script.js",
  "/img/backgroundhero.png",
  "/img/srngengelogoo.png",
  "/img/texthero.png",
  "/img/usersvgg.png",
  "/img/google-icon.png",
  "/img/aboutus.png",
  "/img/Gallery.png",
  "/img/packages.png",
  "/img/review.png",
  "/img/contact.png",
  "/img/kegiatancamp.jpeg",
  "/img/surf.JPG",
  "/img/food.JPG",
  "/img/memory.JPG",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
