window.onload = function() {
    // Initialise la map
    googleMaps.initMap(); 
    // Initialise les markers
    googleMaps.initMarker();
    // Affiche la réservation d'un vélib
    form.showReservation();
    // Initialise le canvas
    createCanvas.initCanvas();
    // Valide la réservation et l'affiche
    form.reservationSuccess();
    // Annulation de la réservation
    form.deleteReservation();
    // Vérification qu'une réservation soit en cours
    form.webStorage();
};
