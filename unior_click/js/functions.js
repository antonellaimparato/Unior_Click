// addEventListener serve per dire al codice di aspettare che tutta la pagina HTML si sia caricata e letta dal browser.
// senza ciò cercheremo di modificare elementi che non esistono ancora.
document.addEventListener('DOMContentLoaded', function() {

    // const convenzioni, all'interno definiamo tutte le convenzioni come un array di oggetti dove ogni oggetto rappresenta un locale e contiene tutte le informazioni necessarie.
    // come ad esempio ID unico, offerta, tipo che serve per la ricerca, sede e cosi via. in più anche le coordinate lat/lng che servono per la mappa e navigatore
    const convenzioni = [
        // Sede: giusso
        { id: 1, nome: "Pappa e Pizza🍕", indirizzo: "Via Enrico De Marinis 6, 80134 Napoli", offerta: "Coupon cumulabili per ricevere pizze o menù in omaggio. (Esibire la nostra card per avere quella coupon)", tipo: "cibo pizza", sede: "giusso", lat: 40.8461, lng: 14.2566 },
        { id: 2, nome: "Bar Orientale", indirizzo: "Largo Giusso Girolamo 2, 80134 Napoli", offerta: "Colazione: caffè + cornetto, cappuccino + cornetto. Pranzo: consumazione + bibita. 10% di sconto sui tavoli (sempre).", tipo: "bar colazione pranzo", sede: "giusso", lat: 40.84573, lng: 14.25527 },
        { id: 6, nome: "120 Grammi🍝", indirizzo: "Via Mezzocannone 24, 80134 Napoli", offerta: "Pranzo: Acqua in omaggio accanto ad ogni vaschetta", tipo: "cibo pranzo pasta", sede: "giusso", lat: 40.8461, lng: 14.2566 },
        { id: 8, nome: "O Grin", indirizzo: "Via Mezzocannone 83, 80134 Napoli", offerta: "Pranzo (asporto e al tavolo): Pasta del giorno, Panino con burger, Menù (insalata/panini + dolce + bibita), Menù (primo + dolce + bibita)", tipo: "cibo pranzo vegan", sede: "giusso", lat: 40.8465, lng: 14.2570 },
        { id: 10, nome: "Bar Santa Chiara☕️", indirizzo: "Largo Banchi Nuovi 2, 80134 Napoli", offerta: "Colazione: caffè espresso + consumazione. Pranzo: bibita + pizzetta", tipo: "bar colazione pranzo", sede: "giusso", lat: 40.84531, lng: 14.25497 },

        // Sede: corigliano
        { id: 3, nome: "Libreria Orientale📚", indirizzo: "Largo S. Giovanni Maggiore 16, 80134 Napoli", offerta: "5% di sconto sui libri", tipo: "libri cultura", sede: "corigliano", lat: 40.84555, lng: 14.25582 },

        // Sede: mediterraneo
        { id: 4, nome: "Gran Caffè☕️", indirizzo: "Via Nuova Marina, 80133 Napoli", offerta: "Pranzo: Primo + bevanda a scelta, Secondo + contorno + bevanda a scelta", tipo: "bar pranzo", sede: "mediterraneo", lat: 40.845275, lng: 14.26019 },
        { id: 5, nome: "Copy Smile📖", indirizzo: "Via Nuova Marina 31, 80133 Napoli", offerta: "20% di sconto + rilegatura in omaggio sui libri", tipo: "copisteria servizi libri", sede: "mediterraneo", lat: 40.8455, lng: 14.2605 },

        // Sede: porta-coeli
        { id: 7, nome: "Dolce e Salato🥐🍕", indirizzo: "Via Chiavettieri al porto, 50-51, 80133 Napoli", offerta: "sconto attivo per student3", tipo: "cibo bar", sede: "porta-coeli", lat: 40.84369, lng: 14.25814 },
        { id: 9, nome: "Mangia & Bevi🍽️🧃", indirizzo: "Via Sedile di Porto 92, 80134 Napoli", offerta: "Pranzo: acqua + pasta, acqua + secondo, acqua + contorno", tipo: "cibo pranzo", sede: "porta-coeli", lat: 40.8445, lng: 14.2575 },
        { id: 11, nome: "Magia della Carta📖", indirizzo: "Via Porta di Massa 10, 80133 Napoli", offerta: "15% di sconto su libri e stampe", tipo: "libri copisteria servizi", sede: "porta-coeli", lat: 40.847693, lng: 14.261667 },
        { id: 12, nome: "Uni Bar🏫", indirizzo: "Via Porta di Massa 6, 80133 Napoli", offerta: "Colazione: caffè espresso con cremina e consumazione. Pranzo: bibita e consumazione", tipo: "bar colazione pranzo", sede: "porta-coeli", lat: 40.84369, lng: 14.25814 }
    ];

    // Qui catturiamo gli elementi della pagina HTML con la quale dovremo parlare, salvando ogni elemento in una variabile.
    const cardContainer = document.getElementById('card-container');  // qui è dove inseriamo le card (ex griglia-locali)
    const searchBar = document.getElementById('search-bar');     // la barra di ricerca
    const sedeFilter = document.getElementById('sede-filter');   // qui la tendina della ricerca

    // Qui abbiamo i riferimenti all'interfaccia utente che riguardano le recensioni
    const reviewModal = document.getElementById('review-modal'); // Il modale delle recensioni
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.getElementsByClassName('close')[0]
    const reviewsListContainer = document.getElementById('reviews-list-container');  // qui tramite document.getElementById andiamo a cercare dentro HTML un elemento che ha ID 'reviews-list-container' e serve per mostrarci successivamente i commenti che vengono scritti.
    const reviewForm = document.getElementById('review-form');  // questo è il modulo che ci serve per scrivere il commento
    const reviewText = document.getElementById('review-text');  // qua abbiamo l'area del testo
    const starRatingInput = document.querySelector('.star-rating-input');  // starRatingInput abbiamo una query che ci permette di cliccare sulle stelle per lasciare le recensioni.

    // Riferimenti all'interfaccia utente per le mappe
    const mapModal = document.getElementById('map-modal');
    const mapModalTitle = document.getElementById('map-modal-title');
    const mapCloseBtn = document.getElementById('map-close-btn');
    let map;  // variabile che ci serve per mantenere l'istanza della mappa Leaflet

    // Variabile per tenere il voto che si mette alle stelle per le recensioni
    let currentStarRating = 0;

    // qui creo l'HTML per una singola card
    function createCardHTML(convenzione) {
        // questo URL viene collegato al tasto 'Avvia Navigatore', creo la variabile navUrl ci passo l'URL di maps e tramite il commando 'daddr' dico al dispositivo di calcolare il percorso
        const navUrl = `https://maps.google.com/maps?daddr=${convenzione.lat},${convenzione.lng}`;
        // uso i backtick ovvero accenti gravi per poter inserire le variabili dentro HTML
        // "data-id", "data-nome" ecc servono per nascondere queste informazioni dentro il bottone, cosi quando ci clicco sopra posso recuperarli facilmente poi nel codice.
        return `  
            <div class="card">
                <h3>${convenzione.nome}</h3>
                <p class="indirizzo">${convenzione.indirizzo}</p>
                <p class="offerta">${convenzione.offerta}</p>
                 
                <div class="card-actions">
                    <a href="${navUrl}" target="_blank" class="nav-btn">
                        Avvia Navigatore
                    </a>
                    <button class="map-btn" 
                            data-id="${convenzione.id}" 
                            data-nome="${convenzione.nome}" 
                            data-lat="${convenzione.lat}" 
                            data-lng="${convenzione.lng}">
                        Mostra Mappa
                    </button>
                    <button class="review-btn" 
                            data-id="${convenzione.id}" 
                            data-nome="${convenzione.nome}">
                        Recensioni
                    </button>
                </div>
            </div>
        `;
    }

    // Qui costruisco la pagina con le sue 4 sezioni, organizzando in sezioni per le sedi.
    function populateGroupedConvenzioni() {
        cardContainer.innerHTML = ''; // Pulisco tutto

        // Definisco le sedi manualmente
        const sedi = [
            { id: 'mediterraneo', titolo: 'Palazzo del Mediterraneo' },
            { id: 'giusso', titolo: 'Palazzo Giusso' },
            { id: 'porta-coeli', titolo: 'Palazzo Santa Maria Porta Coeli' },
            { id: 'corigliano', titolo: 'Palazzo Corigliano' }
        ];

        // mentre qua tramite if giro su ogni sezione per creare il titolo e le card
        sedi.forEach(function(sedeObj) {

            // Filtro le convenzioni per questa sede specifica
            const convenzioniSede = convenzioni.filter(function(c) {
                return c.sede === sedeObj.id;
            });

            // controllo se ci sono locali per questa sede, se è vuota non creo nulla
            if (convenzioniSede.length > 0) {
                // Creo il titolo della sezione
                let sezioneHTML = `
                    <section class="sede-section">
                        <h2 id="${sedeObj.id}" class="sede-heading">${sedeObj.titolo}</h2>
                        <div class="card-grid">
                `;

                // Aggiungo tutte le card di questa sede concatenando HTML generato da createCardHTML
                convenzioniSede.forEach(function(conv) {
                    sezioneHTML += createCardHTML(conv);
                });

                sezioneHTML += `</div></section>`;

                cardContainer.innerHTML += sezioneHTML; // per poi aggiungerlo alla pagina
            }
        });
    }

    // displayFilteredConvenzioni serve per la ricerca in base a ciò che scrivo dentro la barra di ricerca.
    function displayFilteredConvenzioni(searchTerm) {
        // qui uso filter per cercare se il testo scritto è contenuto nel nome, indirizzo o tipo del locale
        const filtered = convenzioni.filter(function(c) {
            return c.nome.toLowerCase().includes(searchTerm) ||
                c.indirizzo.toLowerCase().includes(searchTerm) ||
                c.tipo.toLowerCase().includes(searchTerm);
        });

        cardContainer.innerHTML = ''; // pulisco la griglia prima di far vedere i risultati

        // se la lista dei trovati è vuota, mostro un messaggio di avviso
        if (filtered.length === 0) {
            cardContainer.innerHTML = '<p class="no-results">Nessuna convenzione trovata.</p>';
            return;
        }

        let gridHTML = '<div class="card-grid">';

        // e dopo mostro solo i risultati trovati
        filtered.forEach(function(conv) {
            gridHTML += createCardHTML(conv);
        });

        gridHTML += '</div>';
        cardContainer.innerHTML = gridHTML; // qui inserisco il risultato finale nella pagina
    }

    //  FUNZIONI PER LE RECENSIONI

    // setStarsVisual serve per colorare le stelle quando ci passo con mouse sopra oppure ci clicco.
    function setStarsVisual(rating) {
        const stelle = starRatingInput.querySelectorAll('span'); // prendo tutte le stelle
        // giro su ogni stella per decidere se accenderla o spegnerla
        stelle.forEach(function(star) {
            // se il numero della stella è minore o uguale al voto, le do la classe selezionata
            if (parseInt(star.dataset.value) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected'); // altrimenti la faccio tornare bianca
            }
        });
    }

    // qui resetto le stelle a zero quando chiudo il pop-up
    function resetStarRatingInput() {
        currentStarRating = 0;
        setStarsVisual(0);
    }

    // openReviewModal mi serve per aprire il pop-up delle recensioni
    function openReviewModal(conventionId, conventionName) {
        modalTitle.textContent = `Recensioni per ${conventionName}`;
        reviewModal.dataset.currentId = conventionId;  // salvo l'ID del locale nel modal per sapere a chi devo salvare la recensione dopo
        loadReviews(conventionId); // loadReviews mi carica i vecchi commenti
        reviewModal.classList.remove('hidden'); // tolgo la classe 'hidden' per rendere visibile il modale
        resetStarRatingInput();
        reviewText.value = ''; // qui invece pulisco l'area di testo per scrivere una nuova recensione
    }

    function closeReviewModal() {
        reviewModal.classList.add('hidden');  // chiudo la classe (aggiungo hidden)
    }

    // a questo punto carico le recensioni dalla memoria del browser 'localStorage'
    function loadReviews(conventionId) {
        reviewsListContainer.innerHTML = '';
        // successivamente prendo la parte della memoria salvata sul browser e la trasformo in oggetti JavaScript ovvero JSON.parse
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {};
        const conventionReviews = allReviews[conventionId] || [];

        // se non ci sono commenti per questo locale, mostro un messaggio
        if (conventionReviews.length === 0) {
            reviewsListContainer.innerHTML = '<p class="no-reviews">Nessuna recensione ancora.</p>';
            return;
        }

        // forEach recensione vado a creare il blocco HTML con le stelle e il testo
        conventionReviews.forEach(function(review) {
            const reviewElement = document.createElement('div'); // creo un nuovo DIV che mi serve per come contenitore generico a livello di blocco
            reviewElement.classList.add('review-item'); // gli assegno la classe CSS

            // genero le 5 stelle
            let starsHTML = '<div class="star-rating-display">';
            // con il ciclo iterativo FOR ciclo da 1 a 5 per creare le stelle gialle o bianche in base al voto
            for (let i = 1; i <= 5; i++) {
                if (i <= review.stars) {
                    starsHTML += '<span class="star-filled">★</span>';
                } else {
                    starsHTML += '<span class="star-empty">★</span>';
                }
            }
            starsHTML += '</div>';

            // inserisco HTML delle stelle e il testo del commento dentro il div
            reviewElement.innerHTML = starsHTML + '<p>' + review.text + '</p>';
            reviewsListContainer.appendChild(reviewElement); // e poi aggiungo il commento completo alla lista
        });
    }

    // Salvo una nuova recensione nel localStorage
    function saveReview(conventionId, stars, text) {
        // leggo tutto ciò che già c'era di salvato
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {};

        // se è la prima recensione allora creo una nuova lista vuota
        if (!allReviews[conventionId]) {
            allReviews[conventionId] = [];
        }
        // creo una nuova variabile recensioni (oggetto)
        const newReview = {
            stars: stars,
            text: text
        };
        // e lo aggiungo alla lista
        allReviews[conventionId].push(newReview);
        // salvo di nuovo tutto nel browser trasformando in testo JSON.stringify.
        localStorage.setItem('unioriclick_reviews', JSON.stringify(allReviews));
    }

    // funzioni per la mappa leaflet

    function openMapModal(nome, lat, lng) {
        mapModalTitle.textContent = `Mappa per ${nome}`;
        mapModal.classList.remove('hidden'); // per prima cosa rendo visibile il contenitore della mappa
        // siccome leaflet a volte si confonde e non disegna bene gli do un piccolo ritardo per aprire il pop-up e disegnare la mappa
        setTimeout(function() {
            if (map) {
                map.remove(); // poi se c'era già una mappa la cancello
            }

            // creo la mappa Leaflet e assegno il valore di 17 che è lo zoom
            /* global L */
            map = L.map('mapid').setView([lat, lng], 17);

            // aggiungo lo sfondo della mappa 'openstreetmap'
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // aggiungo il marker ovvero il puntino rosso
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<b>${nome}</b>`).openPopup();
        }, 100);
    }

    function closeMapModal() {
        mapModal.classList.add('hidden');
        if (map) {
            map.remove(); // ad ogni chiusura della mappa la distruggo per risparmiare memoria
            map = null;
        }
    }

    // parte della gestione degli eventi

    // qui nella tendina quando premo e cambio sede, mi scorre la pagina fino alla sede scelta
    sedeFilter.addEventListener('change', function(e) {
        const selectedID = e.target.value;
        const elementToScrollTo = document.getElementById(selectedID);
        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' }); // qui scorro fino all'elemento specifico
        }
    });

    // qui ci troviamo nella barra di ricerca, quando scrivo qualcosa mi filtra le card in tempo reale
    searchBar.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 0) {
            displayFilteredConvenzioni(searchTerm);
        } else {
            populateGroupedConvenzioni(); // se dopo if cancello tutto nella barra di ricerca mi deve rimostrare tutta la lista
        }
    });

    // qua controllo i click sui vari bottoni (tramite delegazione eventi sulla griglia)
    cardContainer.addEventListener('click', function(e) {
        // questo pezzo mi serve per vedere se ho cliccato su recensioni
        if (e.target.classList.contains('review-btn')) {
            const id = e.target.dataset.id;
            const nome = e.target.dataset.nome;
            openReviewModal(id, nome);
        }
        // quest'altro se ho cliccato su mappa
        if (e.target.classList.contains('map-btn')) {
            const nome = e.target.dataset.nome;
            const lat = e.target.dataset.lat;
            const lng = e.target.dataset.lng;
            openMapModal(nome, lat, lng);
        }
    });

    // qua vado a gestire la chiusura dei Modal o tramite la X o sullo sfondo
    modalCloseBtn.addEventListener('click', closeReviewModal);
    reviewModal.addEventListener('click', function(e) {
        // qui se clicco sullo sfondo scuro e non dentro la finestra bianca chiudo tutto
        if (e.target === reviewModal) {
            closeReviewModal();
        }
    });

    // l'invio del form quando premo su invia recensione
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault(); // qua blocco il refresh della pagina
        const newReviewText = reviewText.value.trim(); // tolgo gli spazi vuoti sia all'inizio che alla fine
        const conventionId = reviewModal.dataset.currentId;

        // se ho scritto qualcosa e ho dato un voto allora lo salvo
        if (newReviewText && currentStarRating > 0) {
            saveReview(conventionId, currentStarRating, newReviewText);
            loadReviews(conventionId); // loadReviews mi serve per mostrare il nuovo commento
            resetStarRatingInput();
            reviewText.value = '';
        } else if (currentStarRating === 0) {
            alert("Per favore, seleziona un voto da 1 a 5 stelle.");
        }
    });

    //  chiusura del Modal Mappa
    mapCloseBtn.addEventListener('click', closeMapModal);
    mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) {
            closeMapModal();
        }
    });

    // sezione per gestire la parte interattiva delle stelle

    // Aggiunge gli eventi a ogni stella
    const stelleInput = starRatingInput.querySelectorAll('span');
    stelleInput.forEach(function(star) {

        // setStarsVisual serve per illuminare le stelle quando ci passo con il mouse sopra
        star.addEventListener('mouseover', function() {
            setStarsVisual(parseInt(star.dataset.value));
        });

        // qua quando clicco sulla stella deve fissare il voto
        star.addEventListener('click', function() {
            currentStarRating = parseInt(star.dataset.value);
            setStarsVisual(currentStarRating);
        });
    });

    // con mouseout mi mostra il voto assegnato o le stelle vuote non colorate
    starRatingInput.addEventListener('mouseout', function() {
        setStarsVisual(currentStarRating);
    });

    //  mi dice che è tutto pronto e quindi può disegnare la pagina
    populateGroupedConvenzioni();
});
