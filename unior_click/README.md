*Unior Click: Your discounts, just one click away!*

Unior click comes from a simple and powerful idea:  to transform L’ Orientale University  “Student Card”, which is often taken because it is free and then  forgotten, into a personal saving tool. 
We have created a Progressive Web App (PWA) that makes all partner discount transparent and easy to access. 
How is the application structured?
The work was divided into three different interconnected blocks:
-	Main interface (index.html):  We set up the viewport to adapt the layout to every type of device, making the app readable everywhere. The page was organized with a header, a logo, a title, search-filters, and modals to show maps and reviews.

-	Style and animation (style.css): We have created an animated background with shades of red. For the discount cards, we used the CSS property backdrop-filter: blur to create a blur effect of the background and a hover transition that lifts the card when the user moves the mouse over it. 


-	The database and functions (functions.js): We simulated a venue archive by defining a constant database using an array of objects. Each venue has a unique ID, map coordinates, and tags specifying the type of offering. The functions allow filtering results in a case-insensitive way (regardless of uppercase or lowercase) and saving reviews in the browser’s LocalStorage. In this way, comments remain stored on the user’s device even after closing the page.

-	Interactive Maps: Using the Leaflet API, we transformed the coordinates into a visual marker (a red dot) on the map. We have also added a button to start the Google Maps navigation directly to the discount partner’s address

Our project is a PWA that can work even without an internet connection: 
-	Manifest (manifest.json): Allows  the app to be installed on the homes screen with a standalone view, without the URL bar.

-	Service Worker (sw.js): Caches the main files during installation and provides the stored content when offline.


-	Registration (main.js):  Checks if the browser supports PWA and registers the Service Worker using the “use strict” directive to prevent errors.
 The replicability of our project is ensured by the workflow we used in WebStorm. As a group of three people (Martina Graziuso, Antonella Imparato, Vasyl Pavlioglo), we used a GitHub repository to combine our contributions:
-	Pull:  Before starting to write code, we always pulled changes from others to avoid conflicts.
-	Commit & Push:  Every time we completed a feature (such as the review stars or the venue filter), we saved and uploaded the code to the repository to make it available to our teammates.
This allowed us to have a clean final  code, where each  file is correctly  linked to the others, effectively combining separately written code into a single project.
Instructions for Replication
To reproduce the project from the GitHub repository:
1.	Clone: Download the repository to your local PC (e.g., via WebStorm or the git clone command).

2.	Always pull to ensure you have the latest version of the code merged by the team.

3.	Check that the files index.html, manifest.json, and sw.js are in the root folder, while scripts and styles are in their respective /js and /css folders.

4.	Run the project through a local server (WebStorm does this automatically by clicking the browser icon) because the Service Worker will not register if you open the files directly from the folder path.

-----------------------------------------------
 *Unior Click: I tuoi sconti a portata di click!*

Unior Click nasce da un’idea semplice ma concreta: trasformare la "Card Student" dell'Università L'Orientale, che spesso viene ritirata perché è gratis ma va dimenticata, in uno strumento di risparmio quotidiano. Abbiamo creato una Progressive Web App (PWA) che rende tutte le convenzioni trasparenti e facili da consultare.
Com’è fatta l’applicazione?
Abbiamo diviso il lavoro in diversi blocchi che comunicano tra loro:
•	L'interfaccia principale (index.html): Abbiamo impostato il viewport per far sì che il layout si adatti a ogni dispositivo, rendendo l'app leggibile ovunque. La pagina è organizzata con un header per il logo e il titolo, un main per i filtri di ricerca e delle finestre modali (pop-up) per mostrare mappe e recensioni.

•	Lo stile e le animazioni (style.css): Abbiamo creato uno sfondo animato con sfumature di rosso. Per le card delle convenzioni abbiamo usato la proprietà backdrop-filter: blur per creare un effetto di sfocatura dello sfondo e una transizione che fa sollevare la card quando l'utente passa il mouse sopra.

•	Il database e le funzioni (functions.js): Abbiamo simulato un archivio dei locali definendo un database costante tramite un array di oggetti. Ogni locale possiede un ID univoco, le coordinate per la mappa e tag specifici per il tipo di offerta. Le funzioni permettono di filtrare i risultati in modalità “Case Insensitive” (indipendentemente da maiuscole o minuscole) e di salvare le recensioni nel LocalStorage del browser. In questo modo, i commenti rimangono salvati nel dispositivo dell’utente anche chiudendo la pagina.

•	Mappe Interattive: Usando l'API Leaflet, trasformiamo le coordinate in un marcatore visuale (in un puntino rosso) sulla mappa. Abbiamo aggiunto anche un tasto per avviare direttamente la navigazione di Google Maps verso l'indirizzo della convenzione.

Il progetto è una PWA che  può funzionare anche senza internet:

•	Il Manifest (manifest.json): Permette di installare l'app sulla home del telefono con la visualizzazione standalone, senza la barra dell'URL.

•	Il Service Worker (sw.js): Salva nella cache i file principali durante l'installazione e fornisce i contenuti memorizzati quando si è offline.

•	Registrazione (main.js): Controlla se il browser supporta le PWA e registra il Service Worker usando la direttiva 'use strict' per evitare errori.

La replicabilità del nostro progetto è garantita dal metodo di lavoro che abbiamo usato su WebStorm. Essendo un gruppo di tre persone (Martina Graziuso, Antonella Imparato, Vasyl Pavlioglo), abbiamo usato una repository su GitHub per unire i pezzi:

•	Pull: Prima di iniziare a scrivere, scaricavamo le modifiche degli altri per evitare errori.

•	Commit e Push: Ogni volta che completavamo una funzione (come le stelle delle recensioni o il filtro delle sedi), salvavamo e caricavamo il codice sulla repository per renderlo disponibile ai compagni.

Questo ha permesso di avere un codice finale pulito, dove ogni file è collegato correttamente agli altri, quindi ha unito codici scritti separatamente in un unico progetto.
Istruzioni per la replica
Per riprodurre il progetto partendo dalla repository GitHub:
1. Clonazione: Scarica la repository locale sul tuo PC (es. tramite WebStorm o comando git clone).
2.	Esegui sempre un Pull per assicurarti di avere l'ultima versione del codice unito dal team.
3.	 Controlla che i file index.html, manifest.json e sw.js siano nella cartella principale (root), mentre gli script e gli stili siano nelle rispettive cartelle /js e /css.
4.	Avvia il progetto tramite un server locale (WebStorm lo fa in automatico cliccando sull'icona del browser) perché il Service Worker non si registra se apri il file come semplice percorso cartella.

