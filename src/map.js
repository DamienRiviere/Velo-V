import {ajaxGet} from "./ajax.js";
import {markerManager} from "./marker.js";

const googleMaps = {  
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=6ea6ca28e94413eeea15087de90e12a2462343c5",
    map,
    form: document.getElementById("section-form"),
    reservationTimer: document.getElementById("reservation-timer"),
    modalReservation: document.getElementById("modal-reservation"),
    reservationTitle: document.getElementById("reservation-title"),
    alertForm: document.getElementById("alert-form"),
    buttonResetMap: document.getElementById("reset-map"),

    /**
     * Permet d'initialiser la carte
     */
    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 45.764043, lng: 4.835659},
            zoom: 13,
        });

        this.initReservation();
        this.resetMap();
    },

    /**
     * Permet d'initialiser les markers
     */ 
    initMarker() {
        // Création d'un object manager à partir du prototype de markerManager
        const manager = Object.create(markerManager);

        // Récupération des données des stations via une requête ajax
        ajaxGet(this.url, function(response) {
            const stations = JSON.parse(response);

            stations.forEach(station => {
                manager.createMarker(station);
                manager.initIcon(station);
                manager.showStation(station);
            });

            manager.createMarkerClusterer();
        });
    },

    /**
     * Permet de gérer l'affichage du formulaire et de la réservation au chargement de la page
     */
    initReservation() {
        this.form.style.display = "none";
        this.reservationTimer.style.display = "none";
        this.modalReservation.style.display = "none";
        this.reservationTitle.classList.add("mb-0");

        if(sessionStorage.getItem("name") && sessionStorage.getItem("temps")) {
            this.alertForm.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            Si vous voulez réserver un autre Vélib à une autre station, <span class="font-weight-bold">veuillez annuler la réservation en cours</span>.
        `;
            this.alertForm.classList.add("alert-danger");
            this.alertForm.classList.remove("alert-warning");
        }
    },

    /**
     * Permet de réinitialiser la map à ses coordonnées d'origine
     */
    resetMap() {
        this.buttonResetMap.addEventListener(("click"), () => {
            googleMaps.map.setZoom(13);
            googleMaps.map.setCenter({lat: 45.764043, lng: 4.835659});
        });
    }


};

export {googleMaps};