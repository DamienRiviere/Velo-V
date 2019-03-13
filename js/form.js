const form = {
    buttonReservation: document.getElementById("button-reservation"),
    reservationSuccessButton: document.getElementById("reservation-success"),
    buttonReservationDelete: document.getElementById("delete-reservation"),
    x: null,
    stationName: null,

    /**
     * Permet d'afficher une réservation
     */
    showReservation() {
        this.buttonReservation.addEventListener("click", function() {
            document.getElementById("section-reservation").style.display = "block";
            document.getElementById("map-legend").style.display = "none";
            document.getElementById("button-reservation").style.display = "none";
            document.getElementById("canvas-delete").style.display = "inline-block";
        });
    },

    /**
     * Permet valider la réservation
     */
    reservationSuccess(station) {
        this.reservationSuccessButton.addEventListener("click", function() {
            // Pour recommencer à 0 le décompte si l'on réserve un vélib sur une autre station
            clearInterval(form.x);

            const alertForm = document.getElementById("alert-form");

            sessionStorage.setItem("name", station);

            document.getElementById("reservation-success").style.display = "none";
            createCanvas.context.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("section-form").style.display = "none";
            alertForm.style.display = "block";
            alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Si vous voulez réserver un autre Vélib à une autre station, <span class="font-weight-bold">veuillez annuler la réservation en cours</span>.
            `;
            alertForm.classList.add("alert-danger");
            alertForm.classList.remove("alert-warning");
            document.getElementById("map-legend").style.display = "block";

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
        form.x = setInterval(function () {
            const reservationTitle = document.getElementById("reservation-title");
            const reservationTimer =  document.getElementById("reservation-timer");
            const reservationDelete = document.getElementById("delete-reservation");
            const reservationContainer = document.getElementById("reservation-container");
            const alertForm = document.getElementById("alert-form");

            const dateActuel = new Date().getTime();
            const distance = dateFin - dateActuel;

            // On transforme les millisecondes en minutes et secondes
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((distance % (1000 * 60)) / 1000);
            
            // On stock la date actuel en milliseconde
            sessionStorage.setItem("temps", distance);

            // Gestion du container de la réservation
            reservationContainer.classList.add("alert-success");
            reservationContainer.classList.remove("alert-secondary");
            reservationContainer.classList.remove("alert-danger");
            reservationTitle.classList.remove("text-center", "mb-0");
            reservationTimer.style.display = "block";
            reservationDelete.style.display = "inline-block";
            reservationTitle.textContent = " Votre réservation est validée !";
            reservationTimer.innerHTML = `Vous avez réservé 1 vélib à la station <span class="font-weight-bold">${sessionStorage.name}</span>. <br> Expire dans : <span class="font-weight-bold">${minutes} minute(s) et ${secondes} seconde(s)</span>.`

           // Si le décompte arrive à 0, la réservation expire
            if (distance < 0) {
                reservationContainer.classList.remove("alert-success");
                reservationContainer.classList.add("alert-danger");
                reservationTitle.textContent = "Votre réservation a expiré !";
                reservationTitle.classList.add("text-center", "mb-0");
                reservationTimer.style.display = "none";
                reservationDelete.style.display = "none";
                alertForm.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    Veuillez sélectionner une station !
                `;
                alertForm.classList.add("alert-warning");
                alertForm.classList.remove("alert-danger");
            }
                
        });
            
    },

    /**
     * Permet d'annuler une réservation
     */
    deleteReservation() {
        this.buttonReservationDelete.addEventListener("click", function() {
            const reservationTitle = document.getElementById("reservation-title");
            const reservationTimer =  document.getElementById("reservation-timer");
            const reservationDelete = document.getElementById("delete-reservation");
            const reservationContainer = document.getElementById("reservation-container");
            const alertForm = document.getElementById("alert-form");

            reservationContainer.classList.remove("alert-success");
            reservationContainer.classList.add("alert-danger");
            reservationTitle.textContent = "Votre réservation est annulée !";
            reservationTitle.classList.add("text-center", "mb-0");
            reservationTimer.style.display = "none";
            reservationDelete.style.display = "none";
            alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Veuillez sélectionner une station !
            `;
            alertForm.classList.add("alert-warning");
            alertForm.classList.remove("alert-danger");

            clearInterval(form.x);
            sessionStorage.clear();
        });
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