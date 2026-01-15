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