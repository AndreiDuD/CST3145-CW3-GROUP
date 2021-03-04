var cacheName = "petstore";
var cacheFiles = [
    "index.html",
    "products.js",
    "lessons.js",
    "petstore.webmanifest",
    "style.css",

    "./images/english.png",
    "./images/french.png",
    "./images/geography.png",
    "./images/gymnastics.png",
    "./images/it.png",
    "./images/italian.png",
    "./images/maths.png",
    "./images/media studies.png",
    "./images/music.png",
    "./images/sports.png",

    "./images/pet-shop-icon_32.png",
    "./images/pet-shop-icon_512.png"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("[Service Worker] Catching all the files");
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});