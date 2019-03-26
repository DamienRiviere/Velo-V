const createCanvas = {
    mouseX: 0, // Variables pour la position de la souris
    mouseY: 0,
    lastX: -1, // Variables pour la précédente position de la souris
    lastY: -1,
    mouseDown: false, // Variable pour vérifer que le boutton de la souris soit appuyée pour commencer à dessiner
    context: null,

    initCanvas() { // Pour créer le canvas
        const canvas  = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        canvas.width = 310; // Largeur du canvas
        canvas.height = 100; // Hauteur du canvas
        this.context.fillStyle = "#fff"; // Couleur de fond
        this.context.lineWidth = 2; // Epaisseur du trait
        this.context.strokeStyle = "black"; // Couleur du trait
        this.context.lineCap = 'round'; // Extrémité du trait
        this.draw(); // Pour dessiner
        this.erase(); // Pour effacer le contenu du canvas
    },

    getMousePos(e) { // Pour avoir la position de la souris
        if (!e)
            var e = event;
        if (e.offsetX) {
            this.mouseX = e.offsetX; // Position sur l'axe X
            this.mouseY = e.offsetY; // Position sur l'axe Y
        }
        else if (e.layerX) {
            this.mouseX = e.layerX; // Retourne les coordonnées sur l'axe verticale sur l'event en cours
            this.mouseY = e.layerY; // Retourne les coordonnées sur l'axe horizontale sur l'event en cours
        }
    },

    getTouchPos(e) { // Pour avoir la position du doigt (Pour smartphone et tablette)
        if (!e)
            var e = event;
        if (e.touches) {
            if (e.touches.length == 1) { 
                var touch = e.touches[0]; 
                createCanvas.touchX = touch.pageX - touch.target.offsetLeft;
                createCanvas.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    },

    drawLine(x, y) { // Pour dessiner des traits
        if (this.lastX == -1) {                         // Si c'est un nouveau chemin
                this.lastX = x;                         // Le premier point et le point du clic
                this.lastY = y;
            }
        this.context.beginPath();                       // Début du chemin
        this.context.moveTo(this.lastX, this.lastY);    // Point de départ
        this.context.lineTo(x, y);                      // Tracé de la ligne
        this.context.closePath();                       // Fermeture du chemin
        this.context.stroke();                          
        this.lastX = x;                                
        this.lastY = y;
        document.getElementById("reservation-success").style.display = "inline-block";
    },

    draw() {
        canvas.addEventListener('mousedown', (e) => { 
            createCanvas.mouseDown = true;                                      // Quand la bouton de la souris est down
            createCanvas.getMousePos(e);                                        // On regarde sa position
            createCanvas.drawLine(createCanvas.mouseX, createCanvas.mouseY);    // On commence à dessiner
        }, false);

        canvas.addEventListener('mousemove', (e) => {
            createCanvas.getMousePos(e);                                         // Quand la souris bouge 
            if (createCanvas.mouseDown === true) {                               // On regarde si le bouton est down
                createCanvas.drawLine(createCanvas.mouseX, createCanvas.mouseY); // Et s'il l'est on dessine
            }
        }, false);

        window.addEventListener('mouseup', () => {                          // Quand le bouton de la souris n'est plus down
            createCanvas.mouseDown = false;                                       // La souris n'est plus down
            createCanvas.lastX = -1;                                              // La dernière position de la souris est -1 pour indiquer qu'il y a un nouveau chemin
            createCanvas.lastY = -1;                                                 
        }, false);
        
        // Même chose mais pour les tablettes et smartphones
        canvas.addEventListener('touchstart', (e) => {
            createCanvas.getTouchPos();
            createCanvas.drawLine(createCanvas.touchX, createCanvas.touchY);
            e.preventDefault();
        }, false);

        canvas.addEventListener('touchmove', (e) => {
            createCanvas.getTouchPos(e);
            createCanvas.drawLine(createCanvas.touchX, createCanvas.touchY);
            e.preventDefault();
        }, false);
        
        canvas.addEventListener('touchend', (e) => {
            createCanvas.lastX = -1;
            createCanvas.lastY = -1;
        }, false);
    },

    erase() { // Pour effacer le canvas
        document.getElementById("canvas-delete").addEventListener("click", () => {
            createCanvas.context.clearRect(0, 0, canvas.width, canvas.height); // Efface le contenu du canvas
            document.getElementById("reservation-success").style.display = "none";
        });
    }
}

export {createCanvas};