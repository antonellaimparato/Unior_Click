// addEventListener serve per dire al codice di aspettare che tutta la pagina HTML si sia caricata.
document.addEventListener('DOMContentLoaded', function() {

    /* Definiamo il database, qui uso un array di oggetti JSON costante per simulare il database */
    const convenzioni = [
        // Sede: giusso
        /* id: 1, è l'identificatore univoco che mi serve per collegare le recensioni e le mappe.
        tipo: "cibo pizza", mi servono come parole chiave per la ricerca.
        sede: "giusso" ecc, mi servono come categoria per la ricerca.
        lat e lng invece sono le coordinate per la mappa.
         */
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

    /* Qui prendo gli elementi da HTML per poterli usare con JavaScript.
        Ho preferito utilizzare la variabile "const" invece di "var" e "let" per evitare una sovrascrittura accidentale dei dati importanti come appunto il
        database. Questo riferimento lho trovato su W3School nella pagina "JS Const".
     */
    const cardContainer = document.getElementById('card-container'); // Contenitore delle card
    const searchBar = document.getElementById('search-bar');         // Barra di ricerca
    const sedeFilter = document.getElementById('sede-filter');       // Filtro sede

    // Qui mi riferisco al modale della finestra a comparsa delle Recensioni
    const reviewModal = document.getElementById('review-modal'); // Questo è il contenitore nero trasparente
    const modalCloseBtn = document.getElementsByClassName('close')[0]; // Qui mi riferisco alla "X" della finestra per chiuedere ed è il primo elemento [0] che trova
    const modalTitle = document.getElementById('modal-title'); // Qui faccio vedere il titolo ad esempio "Recensioni per Pappa e Pizza"
    const reviewsListContainer = document.getElementById('reviews-list-container'); // Con reviewsListContainer faccio vedere i commenti vecchi
    const reviewForm = document.getElementById('review-form'); // Creo un nuovo Form per scrivere un commento nuovo
    const reviewText = document.getElementById('review-text'); // L'area di testo
    const starRatingInput = document.querySelector('.star-rating-input'); // Contenitore per le stelle cliccabili

    // Modale della Mappa
    const mapModal = document.getElementById('map-modal');
    const mapModalTitle = document.getElementById('map-modal-title');
    const mapCloseBtn = document.getElementsByClassName('close')[1]; // Idem per la "X" della finestra [2] elemento della pagina
    let map = null; /* Inizializzo la variabile mappa a "null" ovvero vuota per andarla a riempire dopo.
                            La stessa cosa che posso fare in python con un variabile assegnandole None. */

    let currentStarRating = 0; // questa variabile mi serve per ricordare a quante stelle ha cliccato l'utente.

    // Questa funzione prende un oggetto "convenzione" ovvero i suoi dati e restituisce una stringa HTML ovvero la grafica.
    function createCardHTML(convenzione) {
        // Qui creo un link per Google Maps
        const navUrl = `https://maps.google.com/maps?daddr=${convenzione.lat},${convenzione.lng}`;
        /* Utilizzo i backtick introdotto nel 2015 che mi permettono di scrivere stringhe su più righe,
            inserire variabili dinamiche direttamente ne testo usando ${variabile} viene chiamata "interpolazione",
            e mi permette di usare liberamente "" per le classi HTMl senza dover fare l'escape ovvero non devo mettere simboli strani davanti alle virgolette dell'HTML
            ad esempio \ per evitare che il codice porti errori.
         */
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

    /* Questa funzione invece serve per mostrare tutto quando si avvia o quando si resetta la ricerca
        e raggruppa le convenzioni per sede invece di fare un'unica lista.
     */
    function populateGroupedConvenzioni() {
        cardContainer.innerHTML = ''; // Pulisco il contenitore
        const sedi = [       // definisco l'ordine e i titoli delle sezioni che voglio creare
            { id: 'mediterraneo', titolo: 'Palazzo del Mediterraneo' },
            { id: 'giusso', titolo: 'Palazzo Giusso' },
            { id: 'porta-coeli', titolo: 'Palazzo Santa Maria Porta Coeli' },
            { id: 'corigliano', titolo: 'Palazzo Corigliano' }
        ];

        sedi.forEach(function(sedeObj) {     /* Ho utilizzato il "forEach" a differenza del for classico per semplificare la lettura
                                                                    non mi serve gestire un contatore i++, ma voglio semplicemente eseguire le stesse istruzioni
                                                                    per ogni singola sede presente nella lista, una dopo l'altra. */
            // "filter" mi serve per prendere dal database solo i locali di QUESTA sede specifica.
            const convenzioniSede = convenzioni.filter(function(c) {
                return c.sede === sedeObj.id;
            });
            // Nel caso in cui c'è almeno un locale per questa sede allora creo la sezione HTML.
            if (convenzioniSede.length > 0) {
                let sezioneHTML = `
                    <section class="sede-section">
                        <h2 id="${sedeObj.id}" class="sede-heading">${sedeObj.titolo}</h2>
                        <div class="card-grid">
                `;
                convenzioniSede.forEach(function(conv) {   // aggiungo le card dentro questa sezione.
                    sezioneHTML += createCardHTML(conv);
                });
                sezioneHTML += `</div></section>`; // chiudo tutti i <div> aperti.
                cardContainer.innerHTML += sezioneHTML; // Incollo il blocco HTML appena creato nel contenitore principale.
            }
        });
    }

    /* Questa funzione entra in gioco nel momento in cui scrivo nella barra di ricerca,
        non raggruppa per sede ma mostra solo il risultato diretto.
     */
    function displayFilteredConvenzioni(searchTerm) {
        const filtered = convenzioni.filter(function(c) {  // filtered crea un nuovo array solo se gli elementi soddisfano la condizione.
            return c.nome.toLowerCase().includes(searchTerm) ||  /* Con l'operatore logico OR || permetto all'utente di cercare il nome di un locale,
                                                                una via o una categoria contemporaneamente e se sono presenti in uno di questi tre campi lo restituisco*/
                c.indirizzo.toLowerCase().includes(searchTerm) ||  /* inoltre uso LowerCase per rendere la ricerca Case Insensitive ovvero se l'utente scrive Pizza
                                                                       o pizza lo trova lo stesso. */
                c.tipo.toLowerCase().includes(searchTerm);
        });

        cardContainer.innerHTML = ''; // pulisco di nuovo tutto.
        if (filtered.length === 0) {  // uso IF solo se non trovo nulla facendo uscire il messaggio sottostante.
            cardContainer.innerHTML = '<p class="no-results">Nessuna convenzione trovata.</p>';
            return;
        }

        let gridHTML = '<div class="card-grid">'; // inizializzo una variabile gridHTML aprendo un contenitore div che conterrà tutto HTML dei risultati.
        filtered.forEach(function(conv) { // ciclo su ogni elemnto trovato dalla ricerca
            gridHTML += createCardHTML(conv); // e per ogni elemento vado a generare il suo HTML usando la funzione createCardHTML e lo incollo in coda alla stringa
        });
        gridHTML += '</div>'; // chiudo il div
        cardContainer.innerHTML = gridHTML; // prendo tutto il blocco HTML e lo inserisco nella pagine web sostituendo quello che c'era prima.
    }
        // Parte per le recensioni
    // con setStarsVisual gestisco solo l'aspetto visivo delle stelle nel form mi colora solo quelle selezionate.
    // con "rating" ricevo in ingresso un numero e accendo tutte le stelle che hanno quel valore.
    function setStarsVisual(rating) {
        const stars = starRatingInput.querySelectorAll('span'); // seleziono tutte le stelle presenti nel form.
        stars.forEach(function(star) {  // recupero il valore numerico della singola stella dall'attributo data-value che si trova nel HTML.
            const starValue = parseInt(star.dataset.value); // uso parseInt perchè l'attirbuto HTML è una stringa.
            if (parseInt(star.dataset.value) <= rating) { // con l'if se la stella è la numero 1 2 o 3 è il rating corrisponde allora la stella viene accesa con <=
                star.classList.add('selected'); // utilizzo la classe CSS che la colora di giallo.
            } else {
                star.classList.remove('selected'); // sennò la rimuovo.
            }
        });
    }

    function resetStarRatingInput() { // resetto le stella a zero mi è utile quandop apro o chiudo il modale.
        currentStarRating = 0;
        setStarsVisual(0);
    }

    // Apro il pop-up delle recensioni
    function openReviewModal(conventionId, conventionName) {
        modalTitle.textContent = `Recensioni per ${conventionName}`; // imposto il titolo dinamico.
        reviewModal.dataset.currentId = conventionId; // salvo ID nel DOM del modale per usarlo dopo.
        loadReviews(conventionId); // mi carico i commenti vecchi.

        // rendo visibile il modale cambiando il CSS display da 'none' a 'block'
        reviewModal.style.display = "block";

        resetStarRatingInput(); // pulisco le stelle.
        reviewText.value = ''; // qui la textarea.
    }

    // chiudo il pop-up delle recensioni
    function closeReviewModal() {
        reviewModal.style.display = "none"; // nascondo il modale
    }

    // qui vado a leggere i commenti salvati sul LocalStorage del browser
    function loadReviews(conventionId) {
        reviewsListContainer.innerHTML = ''; // pulisco il contenitore HTML per non avere duplicati visivi quando riapro la finestra.
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {}; /* il localStorage salva solo stringhe quindi uso JSON.parse() per
                                                                                                  convertire quella stringa in un vero oggetto JavaScript da utilizzare,
                                                                                                  successivamente ||{} mi serve per vedere se nel caso non c'è nessun database salvato
                                                                                                  allora inizializzo una variabile vuota per non rompere il codice.  */
        const conventionReviews = allReviews[conventionId] || []; // qui estraggo dall'oggetto generale solo l'array che mi interessa in questo caso quello delle recensioni relative solo a questo locale indentificato tramite ID.

        if (conventionReviews.length === 0) { // se è vuoto allora mostro un messaggio 
            reviewsListContainer.innerHTML = '<p class="no-reviews">Nessuna recensione ancora.</p>';
            return;
        }

        conventionReviews.forEach(function(review) { /* qui dico di prendere la lista delle recensioni di questo locale
                                                            e su ogni singola recensione chiamata review esegui tutto il codice qui sotto. */
            const reviewElement = document.createElement('div'); // creo un nuovo "div"
            reviewElement.classList.add('review-item'); // gli passo la classe CSS "review-item" cosi lo può riconoscere

            let starsHTML = '<div class="star-rating-display">'; // apro una variabile stringa che avrà all'interno tutto HTML delle stelle.
            for (let i = 1; i <= 5; i++) { // con il ciclo for che conta da 1 a 5.
                if (i <= review.stars) { // con if chiedo se la stella che sto disegnando è inferiore o uguale al voto che l'utente ha assegnato.
                    starsHTML += '<span class="star-filled">★</span>'; // se si allora aggiungo alla stringa una stella piena.
                } else {
                    starsHTML += '<span class="star-empty">★</span>'; // sennò allora aggiungo una stella vuota.
                }
            }
            starsHTML += '</div>'; // chiudo il div delle stelle.
            reviewElement.innerHTML = starsHTML + '<p>' + review.text + '</p>'; /*qui prendo il div vuoto creato all'inizio reviewElement e ci metto dentro
                                                                                    la stringa delle stelle e il testo delle recensioni "review.text". */
            reviewsListContainer.appendChild(reviewElement); // alla fine prendo il reviewElement e lo incollo nel contenitore principale "reviewListContainer" cosi l'utente lo vede.
        });
    }

    function saveReview(conventionId, stars, text) { // questa funzione mi serve per salvare i dati.
        const allReviews = JSON.parse(localStorage.getItem('unioriclick_reviews')) || {}; /* chiedo al browser di passarmi i dati salvati in "uniorclick_review"
                                                                                                JSON.parse mi traduce la stringa in un oggetto che il codice può leggere
                                                                                                ||{} ci serve per sicurezza ovvero se non c'è nulla in momoria creo un archivio vuoto.*/
        if (!allReviews[conventionId]) { // controllo se nel archivio "allReviews" esiste una cartella per questa specifica convenzione. Il "!" significa se non esiste.
            allReviews[conventionId] = []; // se non esiste la creo e inizializzo una lista vuota ovvero un array.
        }
        const newReview = { stars: stars, text: text }; // metto i dati inseriti dall'utente in un singolo oggetto.
        allReviews[conventionId].push(newReview); // qui prendo la lista specifica di questa convenzione e la pusho cosi viene aggiunta alla lista esistente.
        localStorage.setItem('unioriclick_reviews', JSON.stringify(allReviews)); /* aggiorno i dati in memoria RAM e li salvo permanentemente nel browse
                                                                                   con JSON.stringify congelo tutto l'oggetto trasformandoolo in una semplice stringa
                                                                                   mentre con setItem sovrascrivo la stringa nel localStorage. */
    }

    function openMapModal(nome, lat, lng) { // definisco la funzione chiedendo il nome del luogo e le sue coordinate.
        mapModalTitle.textContent = `Mappa per ${nome}`; // aggiorno il titolo nella finestra modale con il nome del luogo.

        mapModal.style.display = "block"; // rendo visibile la finestra della mappa cambiando il CSS da hiden a visibile.

        setTimeout(function() { // metto in pausa il codice cosi la finestra ha il tempo aprirsi graficamente. Senza questa pausa la mappa non sa quanto è grande il mio contenitore.
            if (map) { // se esiste già una mappa caricata in memoria la cancella
                map.remove();
            }
            /* global L */ // serve per dire al sistema che la variabile "L" è la libreria esterna a Leaflet.
            map = L.map('mapid').setView([lat, lng], 17); // creo il motore della mappa dentro "mapid" legate alle coordinate.
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // qui scarico le immagini grafiche chiamate "tessere" da OpenStreetMap e le incollo come sfondo della mappa.
                attribution: '© OpenStreetMap contributors' // i crediti obbligatori
            }).addTo(map);
            const marker = L.marker([lat, lng]).addTo(map); // posizione il puntino rosso sulle coordinate.
            marker.bindPopup(`<b>${nome}</b>`).openPopup(); // collego al puntino un fumetto col nome del luogo e lo apro
        }, 100); // la pausa di 100mls
    }

    function closeMapModal() { // con questa funzione chiudo la finestra della mappa.

        mapModal.style.display = "none"; // nascondo la finestra cambiando il CSS in invisibile.

        if (map) { // vedo se c'è una mappa in moemoria
            map.remove(); // cancello graficamente la mappa
            map = null; // e svuoto la variabile
        }
    }
    // Gestisco gli eventi
    sedeFilter.addEventListener('change', function(e) { // quando l'utente cambia l'opzione nel menu a tendina
        const selectedID = e.target.value; // leggo quale opzione è stata scelta guardando dentro "e".
        const elementToScrollTo = document.getElementById(selectedID); // cerco nella pagina HTML un elemento che ha quell'ID
        if (elementToScrollTo) { // se è presente
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' }); // lo sposto in cima allo schermo in modo fluido.
        }
    });

    searchBar.addEventListener('keyup', function(e) { // funzione che si riferisce alla barra di ricerca
        const searchTerm = e.target.value.toLowerCase(); /* gli facci leggere tutto il testo e lo converto in minuscolo
                                                                    cosi se scrivo Pizza o pizza risulterà la stessa cosa.*/
        if (searchTerm.length > 0) { // controllo se sta scritto qualcosa
            displayFilteredConvenzioni(searchTerm); // se c'è allora nascondo tutto e faccio vedere solo quello che cerco
        } else {
            populateGroupedConvenzioni(); // sennò faccio rivedere di nuovo tutto.
        }
    });

    cardContainer.addEventListener('click', function(e) { // controllo su quale elemento ho cliccato.
        if (e.target.classList.contains('review-btn')) { // se "e.target" è l'elemento che ho cliccato allora chiedo se ha la classe "review-btn"
            const id = e.target.dataset.id; // qua leggo i dati presenti nel codice del HTML del bottone
            const nome = e.target.dataset.nome;
            openReviewModal(id, nome); // apro la finestra delle recensioni passando i dati che ho letto
        }
        if (e.target.classList.contains('map-btn')) {  // se invece l'elemento ha la classe "map-btn"
            const nome = e.target.dataset.nome; // allora recupero il nome la posizione dai dati nel bottone
            const lat = e.target.dataset.lat;
            const lng = e.target.dataset.lng;
            openMapModal(nome, lat, lng); // alla fine apro la mappa con le coordinate estratte
        }
    });

    // Qui gestisco la chiusura dei modali
    // collego al bottone il tasto "X" per la chiusura
    modalCloseBtn.addEventListener('click', closeReviewModal);

    // qui ascolto i click al di fuori dalla finestra del modale
    reviewModal.addEventListener('click', function(e) {
        if (e.target === reviewModal) { // qui dico se clicco su qualcosa che sia esterno dalla finestra posso chiudere se invece è dentro allora no.
            closeReviewModal();
        }
    });

    // qua gestisco il modulo del invio ovvero il "submit"
    reviewForm.addEventListener('submit', function(e) { // appena clicco su submit o su invio sulla tastiera parte l'evento.
        e.preventDefault(); // essendo che i form in HTML per natura ricaricano la pagina quando vengono inviati con questo commando fermo tutto.
        const newReviewText = reviewText.value.trim(); // prendo il testo scritto e con .trim vado a rimuovere gli spazi bianchi scriti per sbaglio all'inizio o alla fine.
        const conventionId = reviewModal.dataset.currentId; // per sapere a chi appartiene questa recensione recupero l'ID che avevo nascosto nel modale dataset

        if (newReviewText && currentStarRating > 0) { // qua controllo se c'è qualcosa di scritto e se il voto è maggiore a 0
            saveReview(conventionId, currentStarRating, newReviewText); // chiamo la funzione saveReview per salvare i dati nel browser
            loadReviews(conventionId); // rileggo le recensioni e aggiorno la lista cosi l'utente vede il suo commento subito.
            resetStarRatingInput(); // resetto le stelle cliccate
            reviewText.value = ''; // cancello il teto dalla casella per lasciare tutto vuoto.
        } else if (currentStarRating === 0) {
            alert("Per favore, seleziona un voto da 1 a 5 stelle."); // con un messaggio di allerta dico all'utente nel caso in cui non mette almeno 1 stella di doverla mettere.
        }
    });

    // collego l'azione del click sul tasto X alla funzione che chiude la mappa
    mapCloseBtn.addEventListener('click', closeMapModal);

    // creo la chiusura tramite sfondo
    mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) { // questo if mi serve di controllo per non chiuedere la finestra quando clicco sulla mappa
            closeMapModal();
        }
    });

    // qui cerco tutte le stelle ovvero i tag "span" dentro il contenitore vuoto e le metto in una lista
    const starsInput = starRatingInput.querySelectorAll('span');
    starsInput.forEach(function(star) { // poi scorro la lista per mettere i sensosri su ogni singola stella
        star.addEventListener('mouseover', function() { // quando passo con il mouse sulla stella
            setStarsVisual(parseInt(star.dataset.value)); // leggo il valore della stela e gli dico alla grafica di colorarla, quel effetto momentaneo non è che la colora.
        });
        star.addEventListener('click', function() { // mentre quando ci clicca sopra la stella
            currentStarRating = parseInt(star.dataset.value); // salvo il numero nella memoria del programma ovvero la variabile currentStarRating
            setStarsVisual(currentStarRating); // aggiorno la grafica per congelare il voto
        });
    });

    starRatingInput.addEventListener('mouseout', function() { // quando il cursore esce dal box delle stelle
        setStarsVisual(currentStarRating); // cancello l'effetto provvisorio dell'hover e ridisegno le stelle che l'utente aveva confermato con il click
    });

    // fino questa riga il codice era solo una lista di istruzioni, da qui in poi si genera l'interfaccia
    populateGroupedConvenzioni();

    // per evitare bug grafici forzo tramite il codice per far restare le finestre modali invisibili all'avvio.
    reviewModal.style.display = "none";
    mapModal.style.display = "none";
}); // chiudo l'ultima parentesi graffa che è legata al DOM