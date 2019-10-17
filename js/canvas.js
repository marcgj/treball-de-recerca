var canvas = document.querySelector("canvas"); // Selecciona al objecte "canvas"
canvasSize();

document.addEventListener("fullscreenchange", canvasSize());

// Canvia les mides del canvas per aixi coincidir amb la pantalla
function canvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var zm = 1e4;


// Troba el punt mitg del canvas en cada eix aixi per despres poder centrar les orbites en ell
var ofX = canvas.width / 2;
var ofY = canvas.height / 2;

var ctx = canvas.getContext("2d"); //declarem que ctx = a un canvas 2d
ctx.strokeStyle = "#f3f3f3";



// TODO: scale()
// TODO: periode orbital per dT correcte

// Detecta quan el usuari pitxa la tecla enter, per aixi activar la funció...
document.addEventListener("keyup", function (tecla) {
  if (tecla.key === "Enter") {
    zm = document.getElementById("zoom").value*1e5;
    drawCanvas();
    drawPlanet();
    console.log(zm);
    
  }
});


// Funció encarregada de dibuixar el planeta al centre

function drawPlanet() {
  var pr = parseFloat(document.getElementById("rplaneta").value); //pr = Radi del planeta
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, pr / zm, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

drawPlanet(); // Per a que apareixi el cercle ja dibuixat abans de tenir que fer drawCanvas()

function drawCanvas() {
  // Declaracio de variables 

  var G = 6.67408e-11;
  var sXi = parseFloat(document.getElementById("sXi").value);;
  var sYi = parseFloat(document.getElementById("sYi").value);;
  var m = parseFloat(document.getElementById("mplaneta").value);
  var vXi = parseFloat(document.getElementById("vXi").value);
  var vYi = parseFloat(document.getElementById("vYi").value);


  // Temps entre punt i punt
  var t = 0e0;
  var dt = 0.0005e0;

  var aX;
  var aY;

  var vX;
  var vY;

  var sX;
  var sY;


  ctx.clearRect(0, 0, canvas.width, canvas.height); // Esborra qualsevol cosa que hi hagi al canvas abans de dibuixar una nova orbita

  drawPlanet();
  ctx.beginPath();


  ctx.lineWidth = 0.5; // Gruix de la linia




  var sLy = sYi;
  var sLx = sXi;
  var mt = 0;
  var limit = true;
  while (limit) {





    t = t + dt;
    //Calcula la acceleracio 
    aX = ((-G * m) / Math.pow(Math.sqrt(sXi ** 2 + sYi ** 2), 3)) * sXi;
    aY = ((-G * m) / Math.pow(Math.sqrt(sXi ** 2 + sYi ** 2), 3)) * sYi;

    //Calcula les velocitats
    vX = vXi + (aX * t);
    vY = vYi + (aY * t);

    //Calcula la posicio a dibuixar en el grafic
    sX = sXi + vXi * t + (1 / 2 * aX * t ** 2);
    sY = sYi + vYi * t + (1 / 2 * aY * t ** 2);

    //Dibuixa els punts (realment son linies que es conecten) sX i sY al canvas
    ctx.lineTo(sX / zm + ofX, sY / zm + ofY);
    ctx.stroke();

    //Torna les variables finals en les inicials per aixi poder calcular el seguent punt
    vXi = vX;
    vYi = vY;

    sXi = sX;
    sYi = sY;

    //Fa que la orbita es tanqui on toqui
    if (sX > 0 && sY > sLy) {
   
      ++mt;
      if (mt == 2) {
        limit = false;
        ctx.lineTo(sLx / zm + ofX, sLy / zm + ofY);
        ctx.stroke();

        console.log(sX);
        console.log(sY);
        
        
      }
    }


    //Per si acas algu poses una velocitat = o > que la d'escapament aixo acaba el bucle
    if( sX / zm + ofX > canvas.width || sY / zm + ofY > canvas.height){
      limit = false;
    }


  }

}