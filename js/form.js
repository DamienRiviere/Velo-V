const form = {
    buttonReservation: document.getElementById("button-reservation"),
    reservationSuccessButton: document.getElementById("reservation-success"),
    x: null,

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
     * Permet de gérer les évènements du bouton pour valider une réservation
     */
    reservationSuccess() {
        this.reservationSuccessButton.addEventListener("click", function() {
            const reservationSuccess = document.createElement("div");
            reservationSuccess.classList.add("col", "py-5");
            reservationSuccess.innerHTML =
            `
            <div class="container">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Votre réservation est validée !</h4>
                    <p id="reservation-timer"></p>
                    <hr>
                    <p class="mb-0">Vous pouvez annuler votre réservation en cliquant sur la bouton <span class="font-weight-bold text-danger">"Annuler la réservation"</span> ci-dessous.</p>
                </div>
                <div class="col text-center">
                    <a href="#" class="btn btn-danger font-weight-bold">Annuler la réservation</a>
                </div>
            </div>
            `;
            document.getElementsByClassName("container-fluid")[0].appendChild(reservationSuccess);
            document.getElementById("reservation-success").style.display = "none";

            form.reservationTimer();
        });
    },

    
    /**
     * Permet d'initialiser le décompte à chaque réservation
     * @param {*} dateEnCours 
     */
    reservationTimer(dateEnCours) {
        // On crée une variable "dateFin" vide
        let dateFin;
        
        // On utilise la valeur "dateEnCours" dans la variable "dateFin"
        if(dateEnCours) {
            dateFin = new Date().getTime() + Number(dateEnCours);
        }
        // Si dateEnCours est vide on stocke la date actuel + 20 minutes
        else {
            dateFin = new Date().getTime() + 1200000; // 1 200 000 = 20 minutes en millisecondes
        }

        // On utilise la méthode setInterval pour répéter la fonction
        form.x = setInterval(function () {

            const dateActuel = new Date().getTime();
            const distance = dateFin - dateActuel;

            // On transforme les millisecondes en minutes et secondes
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("reservation-timer").innerHTML = `Vous avez réservé 1 vélib à la staion 12001 - LA SOIE. Votre réservation expire dans : <span class="font-weight-bold">${minutes} minute(s) et ${secondes} seconde(s)</span>.`
            
            // On stock la date actuel en milliseconde
            sessionStorage.setItem("temps", distance);

            // Si le décompte arrive à 0, la réservation expire
            // if (distance < 0) {
            //     $("#text_reservation").text ("Votre réservation a expirée.");
            //     $("#text_decompte").hide(0);
            //     buttonForm.annulationReserv.hide(0);
            //     $("#reservation").css({ // Un nouveau style est appliqué sur le footer de réservation
            //         color: "#3D4D65",
            //         fontWeight: 600,
            //         border: "1px solid #0081D5",
            //         backgroundColor: "rgba(0, 129, 213, 0.2)",
            //     });
            //     // Si la réservation expire, on vide le session storage
            //     sessionStorage.clear();
            // }
                
        });
            
    },

}