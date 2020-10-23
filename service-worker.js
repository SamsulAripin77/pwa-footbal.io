const CACHE_NAME = 'football-app-v12'
var urlsToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/detail.html',
    '/manifest.json',
    '/sw-check.js',
    '/asset/js/api.js',
    '/asset/js/db.js',
    '/asset/js/idb.js',
    '/asset/js/nav.js',
    '/asset/js/detail-team.js',
    '/asset/js/materialize.min.js',
    '/asset/js/components/card-detail.js',
    '/asset/js/components/card-item.js',
    '/asset/css/materialize.min.css',
    '/asset/css/card-team.css',
    '/asset/img/bg1.webp',
    '/asset/img/bg2.webp',
    '/asset/img/bg3.webp',
    '/asset/img/bg4.webp',
    '/asset/img/bg5.webp',
    '/asset/img/bg6.webp',
    '/asset/img/bg7.webp',
    '/asset/img/bg8.webp',
    '/asset/img/bg9.webp',
    '/asset/img/bg10.webp',
    '/asset/img/bg11.webp',
    '/asset/icons/aple-192x192.webp',
    '/asset/icons/icon-128x128.webp',
    '/asset/icons/icon-144x144.webp',
    '/asset/icons/icon-152x152.webp',
    '/asset/icons/icon-192x192.webp',
    '/asset/icons/icon-384x384.webp',
    '/asset/icons/icon-512x512.webp',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener("install", function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", function(event) {
    var base_url = "http://api.football-data.org/v2/teams";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true,
                mode: 'no-cors',
                headers: {
                    'X-Auth-Token': '4d8cdc4b83c94ba19969ac6990d91775',
                }
            }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});