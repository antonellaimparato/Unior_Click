// addEventListener serve per dire al codice di aspettare che tutta la pagina HTML si sia caricata.
document.addEventListener('DOMContentLoaded', function() {

    // DEFINIZIONE DATI (Database simulato)
    const convenzioni = [
        // Sede: giusso
        { id: 1, nome: "Pappa e Pizza🍕", indirizzo: "Via Enrico De Marinis 6, 80134 Napoli", offerta: "Coupon cumulabili per ricevere pizze o menù in omaggio.", tipo: "cibo pizza", sede: "giusso", lat: 40.8461, lng: 14.2566 },
        { id: 2, nome: "Bar Orientale", indirizzo: "Largo Giusso Girolamo 2, 80134 Napoli", offerta: "Colazione: caffè + cornetto. Pranzo: consumazione + bibita. 10% di sconto.", tipo: "bar colazione pranzo", sede: "giusso", lat: 40.84573, lng: 14.25527 },
        { id: 6, nome: "120 Grammi🍝", indirizzo: "Via Mezzocannone 24, 80134 Napoli", offerta: "Pranzo: Acqua in omaggio accanto ad ogni vaschetta", tipo: "cibo pranzo pasta", sede: "giusso", lat: 40.8461, lng: 14.2566 },
        { id: 8, nome: "O Grin", indirizzo: "Via Mezzocannone 83, 80134 Napoli", offerta: "Pranzo (asporto e al tavolo): Pasta del giorno, Panino con burger, Menù vegan", tipo: "cibo pranzo vegan", sede: "giusso", lat: 40.8465, lng: 14.2570 },
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

    // RIFERIMENTI HTML (Catturiamo gli elementi dalla pagina)
    const cardContainer = document.getElementById('card-container'); // Contenitore delle card
    const searchBar = document.getElementById('search-bar');         // Barra di ricerca
    const sedeFilter = document.getElementById('sede-filter');       // Filtro sede

    // Riferimenti Modale Recensioni
    const reviewModal = document.getElementById('review-modal');
    const modalCloseBtn = document.getElementsByClassName('close')[0]; // IMPORTANTE: Questo è il tasto X
    const modalTitle = document.getElementById('modal-title');
    const reviewsListContainer = document.getElementById('reviews-list-container');
    const reviewForm = document.getElementById('review-form');
    const reviewText = document.getElementById('review-text');
    const starRatingInput = document.querySelector('.star-rating-input');

    // Riferimenti Modale Mappa
    const mapModal = document.getElementById('map-modal');
    const mapModalTitle = document.getElementById('map-modal-title');
    const mapCloseBtn = document.getElementsByClassName('close')[1]; // IMPORTANTE: Questo è il tasto X della mappa
    let map = null; // Variabile per la mappa

    let currentStarRating = 0;

    // --- FUNZIONI DI CREAZIONE INTERFACCIA ---

    // Crea l'HTML della singola card
    function createCardHTML(convenzione) {
        const navUrl = `https://maps.google.com/maps?daddr=${convenzione.lat},${convenzione.lng}`;
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

    // Mostra tutte le card divise per sede
    function populateGroupedConvenzioni() {
        cardContainer.innerHTML = ''; // Pulisco tutto
        const sedi = [
            { id: 'mediterraneo', titolo: 'Palazzo del Mediterraneo' },
            { id: 'giusso', titolo: 'Palazzo Giusso' },
            { id: 'porta-coeli', titolo: 'Palazzo Santa Maria Porta Coeli' },
            { id: 'corigliano', titolo: 'Palazzo Corigliano' }
        ];

        sedi.forEach(function(sedeObj) {
            // Filtro le convenzioni per questa sede specifica
            const convenzioniSede = convenzioni.filter(function(c) {
                return c.sede === sedeObj.id;
            });

            if (convenzioniSede.length > 0) {
                let sezioneHTML = `
                    <section class="sede-section">
                        <h2 id="${sedeObj.id}" class="sede-heading">${sedeObj.titolo}</h2>
                        <div class="card-grid">
                `;
                convenzioniSede.forEach(function(conv) {
                    sezioneHTML += createCardHTML(conv);
                });
                sezioneHTML += `</div></section>`;
                cardContainer.innerHTML += sezioneHTML;
            }
        });
    }

    // Filtra i locali in base alla ricerca
    function displayFilteredConvenzioni(searchTerm) {
        const filtered = convenzioni.filter(function(c) {
            return c.nome.toLowerCase().includes(searchTerm) ||
                c.indirizzo.toLowerCase().includes(searchTerm) ||
                c.tipo.toLowerCase().includes(searchTerm);
        });

        cardContainer.innerHTML = '';
        if (filtered.length === 0) {
            cardContainer.innerHTML = '<p class="no-results">Nessuna convenzione trovata.</p>';
            return;
        }

        let gridHTML = '<div class="card-grid">';
        filtered.forEach(function(conv) {
            gridHTML += createCardHTML(conv);
        });
        gridHTML += '</div>';
        cardContainer.innerHTML = gridHTML;
    }

    // --- FUNZIONI PER LE RECENSIONI ---

    // Gestione visiva delle stelle
    function setStarsVisual(rating) {
        const stars = starRatingInput.querySelectorAll('span');
        stars.forEach(function(star) {
            if (parseInt(star.dataset.value) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    function resetStarRatingInput() {
        currentStarRating = 0;
        setStarsVisual(0);
    }

    // APRIRE IL MODALE (Metodo W3Schools: display block)
    function openReviewModal(conventionId, conventionName) {
        modalTitle.textContent = `Recensioni per ${conventionName}`;
        reviewModal.dataset.currentId = conventionId;
        loadReviews(conventionId);

        // MODIFICA W3SCHOOLS: Cambio lo stile CSS direttamente
        reviewModal.style.display = "block";

        resetStarRatingInput();
        reviewText.value = '';
    }

    // CHIUDERE IL MODALE (Metodo W3Schools: display none)
    function closeReviewModal() {
        // MODIFICA W3SCHOOLS: Nascondo cambiando lo stile CSS
        reviewModal.style.display = "none";
    }

    // Carica commenti dal LocalStorage
    function loadReviews(conventionId) {
        reviewsListContainer.innerHTML = '';
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {};
        const conventionReviews = allReviews[conventionId] || [];

        if (conventionReviews.length === 0) {
            reviewsListContainer.innerHTML = '<p class="no-reviews">Nessuna recensione ancora.</p>';
            return;
        }

        conventionReviews.forEach(function(review) {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-item');

            let starsHTML = '<div class="star-rating-display">';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.stars) {
                    starsHTML += '<span class="star-filled">★</span>';
                } else {
                    starsHTML += '<span class="star-empty">★</span>';
                }
            }
            starsHTML += '</div>';
            reviewElement.innerHTML = starsHTML + '<p>' + review.text + '</p>';
            reviewsListContainer.appendChild(reviewElement);
        });
    }

    // Salva commento nel LocalStorage
    function saveReview(conventionId, stars, text) {
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {};
        if (!allReviews[conventionId]) {
            allReviews[conventionId] = [];
        }
        const newReview = { stars: stars, text: text };
        allReviews[conventionId].push(newReview);
        localStorage.setItem('unioriclick_reviews', JSON.stringify(allReviews));
    }

    // --- FUNZIONI PER LA MAPPA LEAFLET ---

    // APRIRE LA MAPPA (Metodo W3Schools)
    function openMapModal(nome, lat, lng) {
        mapModalTitle.textContent = `Mappa per ${nome}`;

        // MODIFICA W3SCHOOLS: display block
        mapModal.style.display = "block";

        setTimeout(function() {
            if (map) {
                map.remove();
            }
            /* global L */
            map = L.map('mapid').setView([lat, lng], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<b>${nome}</b>`).openPopup();
        }, 100);
    }

    // CHIUDERE LA MAPPA (Metodo W3Schools)
    function closeMapModal() {
        // MODIFICA W3SCHOOLS: display none
        mapModal.style.display = "none";

        if (map) {
            map.remove();
            map = null;
        }
    }

    // --- GESTIONE DEGLI EVENTI ---

    // Filtro Sede
    sedeFilter.addEventListener('change', function(e) {
        const selectedID = e.target.value;
        const elementToScrollTo = document.getElementById(selectedID);
        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Barra di ricerca
    searchBar.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 0) {
            displayFilteredConvenzioni(searchTerm);
        } else {
            populateGroupedConvenzioni();
        }
    });

    // Delegazione eventi sulla griglia (click bottoni Recensioni e Mappa)
    cardContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('review-btn')) {
            const id = e.target.dataset.id;
            const nome = e.target.dataset.nome;
            openReviewModal(id, nome);
        }
        if (e.target.classList.contains('map-btn')) {
            const nome = e.target.dataset.nome;
            const lat = e.target.dataset.lat;
            const lng = e.target.dataset.lng;
            openMapModal(nome, lat, lng);
        }
    });

    // --- GESTIONE CHIUSURA MODALI (CORREZIONE W3SCHOOLS) ---

    // 1. Chiusura Recensioni (Tasto X)
    modalCloseBtn.addEventListener('click', closeReviewModal);

    // 2. Chiusura Recensioni (Click fuori dallo sfondo)
    reviewModal.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            closeReviewModal();
        }
    });

    // 3. Invio Recensione
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newReviewText = reviewText.value.trim();
        const conventionId = reviewModal.dataset.currentId;

        if (newReviewText && currentStarRating > 0) {
            saveReview(conventionId, currentStarRating, newReviewText);
            loadReviews(conventionId);
            resetStarRatingInput();
            reviewText.value = '';
        } else if (currentStarRating === 0) {
            alert("Per favore, seleziona un voto da 1 a 5 stelle.");
        }
    });

    // 4. Chiusura Mappa (Tasto X)
    mapCloseBtn.addEventListener('click', closeMapModal);

    // 5. Chiusura Mappa (Click fuori)
    mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) {
            closeMapModal();
        }
    });

    // Gestione interazione stelle
    const starsInput = starRatingInput.querySelectorAll('span');
    starsInput.forEach(function(star) {
        star.addEventListener('mouseover', function() {
            setStarsVisual(parseInt(star.dataset.value));
        });
        star.addEventListener('click', function() {
            currentStarRating = parseInt(star.dataset.value);
            setStarsVisual(currentStarRating);
        });
    });

    starRatingInput.addEventListener('mouseout', function() {
        setStarsVisual(currentStarRating);
    });

    // Avvio iniziale della pagina
    populateGroupedConvenzioni();

    // Nascondo esplicitamente i modali all'avvio per sicurezza
    reviewModal.style.display = "none";
    mapModal.style.display = "none";
});