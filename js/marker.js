const markerManager = {

    markers: [],

    // Permet de créer les markers
    createMarker(station) {
        markerManager.marker = new google.maps.Marker ({
            position: station.position,
            title: station.name,
            map: googleMaps.map,
        });
        markerManager.markers.push(markerManager.marker)
    },

    createMarkerClusterer() {
        const markerCluster = new MarkerClusterer(googleMaps.map, markerManager.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }

}