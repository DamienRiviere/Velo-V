const markerManager = {
    markers: [],
    iconAvailable: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
    iconNotAvailable: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },

    /**
     * Permet de créer les markers
     * @param {} station 
     */
    createMarker(station) {
        markerManager.marker = new google.maps.Marker ({
            position: station.position,
            title: station.name,
            map: googleMaps.map
        });
        markerManager.markers.push(markerManager.marker)
    },

    /**
     * Permet de créer le marker clusterer
     */
    createMarkerClusterer() {
        const markerCluster = new MarkerClusterer(googleMaps.map, markerManager.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    },

    /**
     * Permet d'attribuer une icone de marker différente en fonction du nombre de vélo disponible
     * @param {*} station 
     */
    initIcon(station) {
        if(station.available_bikes > 0) {
            this.marker.setIcon(this.iconAvailable)
        } else {
            this.marker.setIcon(this.iconNotAvailable)
        }
    },

    /**
     * Permet d'afficher les informations de la station quand l'on clique sur son marker
     */
    showStation(station) {
        markerManager.marker.addListener("click", function() {
            googleMaps.form.style.display = "block";
            googleMaps.map.panTo(station.position);
            googleMaps.map.setZoom(17);
            createCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

            document.getElementById("alert-form").style.display = "none";
            document.getElementById("section-reservation").style.display = "none";
            document.getElementById("canvas-delete").style.display = "none";
            document.getElementById("reservation-success").style.display = "none";
            document.getElementById("map-legend").style.display = "block";
            document.getElementById("button-reservation").style.display = "inline-block";
            document.getElementById("station-title").textContent = station.name;
            document.getElementById("station-street").textContent = station.address;
            const stationStatut =  document.getElementById("station-statut");
            const stationBike = document.getElementById("station-bike");
            const formFooter = document.getElementById("form-footer");

            // Permet de traduire en français le statut de la station
            if(station.status === "OPEN") {
                stationStatut.textContent = "OUVERTE";
                stationStatut.classList.add("text-success", "font-weight-bold");
            } else {
                stationStatut.textContent = "FERMER";
                stationStatut.classList.add("text-danger", "font-weight-bold");
            }
            
            // Permet d'afficher ou de cacher des éléments en fonction du nombre de vélibs
            if(station.available_bikes > 0) {
                stationBike.textContent = `${station.available_bikes} vélib(s) disponibles.`;
                stationBike.classList.remove("text-danger");
                stationBike.classList.add("text-success", "font-weight-bold");
                formFooter.style.display = "block";
            } else {
                stationBike.textContent = `${station.available_bikes} vélib disponible.`;
                stationBike.classList.remove("text-success");
                stationBike.classList.add("text-danger", "font-weight-bold");
                formFooter.style.display = "none";
            }         
        });
    },

}