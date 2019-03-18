const markerManager = {
    markers: [],
    iconAvailable: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
    iconNotAvailable: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
    stationStatut: document.getElementById("station-statut"),
    stationBike: document.getElementById("station-bike"),
    formFooter: document.getElementById("form-footer"),
   
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
            googleMaps.map.panTo(station.position);
            googleMaps.map.setZoom(17);
        
            // On affiche la section de réservation uniquement s'il n'y a pas de réservation en cours
            if(!sessionStorage.getItem("temps") || sessionStorage.getItem("temps") < 0) {
                googleMaps.form.style.display = "block";
                createCanvas.context.clearRect(0, 0, canvas.width, canvas.height);

                document.getElementById("alert-form").style.display = "none";
                document.getElementById("section-reservation").style.display = "none";
                document.getElementById("canvas-delete").style.display = "none";
                document.getElementById("reservation-success").style.display = "none";
                document.getElementById("map-legend").style.display = "block";
                document.getElementById("button-reservation").style.display = "inline-block";
                document.getElementById("station-title").textContent = station.name;
                document.getElementById("station-street").textContent = station.address;
                        
                // Gestion de l'affichage du statut de la station (OUVERT/FERMER)
                markerManager.showStatut(station);
                // Gestion de l'affichage des vélibs en fonction de leur nombre
                markerManager.showAvailableBike(station);
                
                form.reservationSuccess(station.name);   
            }  
        });
    },

    /**
     * Permet de traduire en français le statut de la station
     * @param {*} station 
     */
    showStatut(station) {
        if(station.status === "OPEN") {
            this.stationStatut.textContent = "OUVERTE";
            this.stationStatut.classList.add("text-success", "font-weight-bold");
        } else {
            this.stationStatut.textContent = "FERMER";
            this.stationStatut.classList.add("text-danger", "font-weight-bold");
        }
    },

    /**
     * Permet d'afficher ou de cacher des éléments en fonction du nombre de vélibs
     * @param {*} station 
     */
    showAvailableBike(station) {
        if(station.available_bikes > 0) {
            this.stationBike.textContent = `${station.available_bikes} vélib(s) disponibles.`;
            this.stationBike.classList.remove("text-danger");
            this.stationBike.classList.add("text-success", "font-weight-bold");
            this.formFooter.style.display = "block";
        } else {
            this.stationBike.textContent = `${station.available_bikes} vélib disponible.`;
            this.stationBike.classList.remove("text-success");
            this.stationBike.classList.add("text-danger", "font-weight-bold");
            this.formFooter.style.display = "none";
        }   
    }

}