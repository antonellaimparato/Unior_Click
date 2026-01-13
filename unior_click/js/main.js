// Aspetta che la pagina si carichi
window.onload = () => {

    // direttiva che impone una serie di restrizioni per evitare errori comuni e pratiche non sicure.
    'use strict';

    // Controlla se il browser supporta le PWA assicurandosi che il service worker sia nell'oggetto navigator
    if ('serviceWorker' in navigator) {

        //  Registrazione del service worker
        navigator.serviceWorker
            .register('./sw.js').then(function (registration) {

                // Il service worker è stato registrato in modo corretto
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            },
            function (err) {

                // Problemi nella registrazione del service worker
                console.log('ServiceWorker registration failed: ', err);
            });
    }
}




