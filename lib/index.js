"use strict";

var _map = require("./map.js");

var _form = require("./form.js");

var _canvas = require("./canvas.js");

var _scroll = require("./scroll.js");

window.onload = function () {
  // Initialise la map
  _map.googleMaps.initMap(); // Initialise les markers


  _map.googleMaps.initMarker(); // Affiche la réservation d'un vélib


  _form.form.showReservation(); // Initialise le canvas


  _canvas.createCanvas.initCanvas(); // Valide la réservation et l'affiche


  _form.form.reservationSuccess(); // Annulation de la réservation


  _form.form.deleteReservation(); // Vérification qu'une réservation soit en cours


  _form.form.webStorage(); // Scrolling


  (0, _scroll.scroll)();
};