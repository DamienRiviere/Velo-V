const googleMaps = {  
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=6ea6ca28e94413eeea15087de90e12a2462343c5",
    map,
    form: document.getElementById("section-form"),

    /**
     * Permet d'initialiser la carte
     */
    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 45.764043, lng: 4.835659},
            zoom: 13,
        });

        this.form.style.display = "none";
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

};