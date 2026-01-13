//Definisco il nome dell'applicazione//
let cacheName = 'unior_click';

//Definisco la lista dei file che devono essere salvati nella cache//
let filesToCache = [
    'index.html',
    'css/styles.css',
    'js/main.js'
];

//Avvio il Service Worker e salvo nella cache tutto il contenuto delle app//
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

//Fornisce contenuti memorizzati nella cache quando si è offline//
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(cache) {
            return response || fetch(e.request);
        })
    );
});