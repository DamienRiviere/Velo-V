const form = {
    buttonReservation: document.getElementById("button-reservation"), // Bouton pour faire apparaître le formulaire de réservation
    buttonReservationSuccess: document.getElementById("reservation-success"), // Bouton pour valider la réservation
    buttonReservationDelete: document.getElementById("delete-reservation"), // Bouton pour annuler la réservation en cours
    mapLegend: document.getElementById("map-legend"), // Légende de la carte
    sectionReservation: document.getElementById("section-reservation"), // Section de la réservation
    canvasClean: document.getElementById("canvas-delete"), // Bouton pour nettoyer le canvas
    alertForm: document.getElementById("alert-form"), // Message d'alerte suivant la situation
    sectionForm: document.getElementById("section-form"), // La section entière d'une réservation
    reservationTitle: document.getElementById("reservation-title"), // Titre de la réservation en cours
    reservationTime: document.getElementById("reservation-timer"), // Temps de la réservation en cours
    reservationContainer: document.getElementById("reservation-container"), // Container de la réservation en cours
    x: null,

    /**
     * Permet d'afficher une réservation
     */
    showReservation() {
        this.buttonReservation.addEventListener("click", function() {
            form.sectionReservation.style.display = "block";
            form.mapLegend.style.display = "none";
            form.buttonReservation.style.display = "none";
            form.canvasClean.style.display = "inline-block";
        });
    },

    /**
     * Permet valider la réservation et de lancer le timer
     */
    reservationSuccess(station) {
        this.buttonReservationSuccess.addEventListener("click", function() {
            // Pour recommencer à 0 le décompte si l'on réserve un vélib sur une autre station
            clearInterval(form.x);
            createCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

            sessionStorage.setItem("name", station);

            // Gestion des différents éléments
            form.buttonReservationSuccess.style.display = "none";
            form.sectionForm.style.display = "none";
            form.alertForm.style.display = "block";
            form.alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Si vous voulez réserver un autre Vélib à une autre station, <span class="font-weight-bold">veuillez annuler la réservation en cours</span>.
            `;
            form.alertForm.classList.add("alert-danger");
            form.alertForm.classList.remove("alert-warning");
            form.mapLegend.style.display = "block";

            // On déclenche le décompte de la réservation
            form.reservationTimer();
        });
    },

    /**
     * Permet d'initialiser le décompte à chaque réservation et gère le container de réservation
     * 
     * @param {*} dateEnCours 
     */
    reservationTimer(dateEnCours) {
        // On crée une variable "dateFin" vide
        let dateFin;
        
        // On utilise la valeur "dateEnCours" dans la variable "dateFin"
        if(dateEnCours) {
            dateFin = new Date().getTime() + Number(dateEnCours);
         // Si dateEnCours est vide on stocke la date actuel + 20 minutes
        } else { 
            dateFin = new Date().getTime() + 1200000; // 1 200 000 = 20 minutes en millisecondes
        }

        // On utilise la méthode setInterval pour répéter la fonction
        this.x = setInterval(function () {
            const dateActuel = new Date().getTime();
            const distance = dateFin - dateActuel;

            // On transforme les millisecondes en minutes et secondes
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((distance % (1000 * 60)) / 1000);
            
            // On stock la date actuel en milliseconde
            sessionStorage.setItem("temps", distance);

            // Permet d'afficher la réservation dans le container de la réservation en cours
            form.reservationSuccessDisplay(minutes, secondes);

           // Si le décompte arrive à 0, la réservation expire
            if (distance < 0) {
                form.expiredReservation();
            }
        });
    },

    /**
     * Gestion de l'affichage du container de réservation une fois le décompte lancer
     * @param {*} minutes 
     * @param {*} secondes 
     */
    reservationSuccessDisplay(minutes, secondes) {
        form.reservationContainer.classList.add("alert-success");
        form.reservationContainer.classList.remove("alert-secondary");
        form.reservationContainer.classList.remove("alert-danger");
        form.reservationTitle.classList.remove("text-center", "mb-0");
        form.reservationTime.style.display = "block";
        form.buttonReservationDelete.style.display = "inline-block";
        form.reservationTitle.textContent = " Votre réservation est validée !";
        form.reservationTime.innerHTML = `Vous avez réservé 1 vélib à la station <span class="font-weight-bold">${sessionStorage.name}</span>. <br> Expire dans : <span class="font-weight-bold">${minutes} minute(s) et ${secondes} seconde(s)</span>.`
    },

    /**
     * Permet d'annuler une réservation
     */
    deleteReservation() {
        this.buttonReservationDelete.addEventListener("click", function() {
            form.reservationContainer.classList.remove("alert-success");
            form.reservationContainer.classList.add("alert-danger");
            form.reservationTitle.textContent = "Votre réservation est annulée !";
            form.reservationTitle.classList.add("text-center", "mb-0");
            form.reservationTime.style.display = "none";
            form.buttonReservationDelete.style.display = "none";
            form.alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Veuillez sélectionner une station !
            `;
            form.alertForm.classList.add("alert-warning");
            form.alertForm.classList.remove("alert-danger");

            clearInterval(form.x);
            sessionStorage.clear();
        });
    },

    /**
     * Gestion de l'affichage à l'expiration de la réservation
     */
    expiredReservation() {
        form.reservationContainer.classList.remove("alert-success");
        form.reservationContainer.classList.add("alert-danger");
        form.reservationTitle.textContent = "Votre réservation a expiré !";
        form.reservationTitle.classList.add("text-center", "mb-0");
        form.reservationTime.style.display = "none";
        form.buttonReservationDelete.style.display = "none";
        form.alertForm.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            Veuillez sélectionner une station !
        `;
        form.alertForm.classList.add("alert-warning");
        form.alertForm.classList.remove("alert-danger");

        clearInterval(form.x);
        sessionStorage.clear();
    },

    /**
     * Gestion du webStorage si il y a une réservation en cours
     */
    webStorage() {
        // On stock la date du session storage dans une variable
        let dateEnCours = sessionStorage.getItem("temps");

        // Si la valeur de "temps" est supérieur à 0, on reprends la réservation en cours
        if (dateEnCours > 0 ) {    
            // On relance le timer avec la date à laquelle elle s'est arrêté
            form.reservationTimer(dateEnCours);
        }
    }

}