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
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
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
