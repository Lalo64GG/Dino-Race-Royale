import { sendData } from "./initWebSocket.js";

let workerObstaculos;
let workerNubes;
let collisionWorker;



const InitWorkers = () => {
  workerObstaculos = new Worker("../src/workers/obstaculosWorker.js");
  workerObstaculos.onmessage = function (e) {
    if (e.data.action === "crearObstaculo") {
      CrearObstaculo();
    }
  };

  workerNubes = new Worker("../src/workers/nubesWorker.js");
  workerNubes.onmessage = function (e) {
    if (e.data.action === "crearNube") {
      CrearNube();
    } else if (e.data.tiempoHastaNube !== undefined) {
      tiempoHastaNube = e.data.tiempoHastaNube;
    }
  };

  collisionWorker = new Worker("../src/workers/collisionWorker.js");
  collisionWorker.onmessage = function (e) {
    if (e.data.isCollision) {
      GameOver();
    }
  };
};

let time = new Date();
let deltaTime = 0;
let highScore;

if (localStorage.getItem("highscore") !== null) {
  highScore = localStorage.getItem("highScore");
}

export function Loop() {
  if (parado) return;
  deltaTime = (new Date() - time) / 1000;
  time = new Date();
  Update();
  requestAnimationFrame(Loop);
}

//****** GAME LOGIC ********//
let gameVel;

let sueloY = 22;
let velY = 0;
let impulso = 900;
let gravedad = 2500;

let dinoPosX = 42;
export let dinoPosY = sueloY;

let sueloX = 0;
let velEscenario = 1280 / 3;
let score = 0;

let parado = true;
let saltando = false;

let distanciaMinimaObstaculo = 2;
let ultimaPosicionObstaculo = 0;
let obstaculoPosY = 16;
let obstaculos = [];

let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;
let maxNubeY = 270;
let minNubeY = 100;
let nubes = [];
let velNube = 0.5;

let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

export function Start() {
  InitWorkers();
  parado = false;
  gameOver = document.querySelector(".game-over");
  suelo = document.querySelector(".suelo");
  contenedor = document.querySelector(".contenedor");
  textoScore = document.querySelector(".score");
  dino = document.querySelector(".dino");
  textoScore.innerText = `Score: ${score}`;
  document.addEventListener("keydown", HandleKeyDown);
  ResetGame();
}

function ResetGame() {
  console.log("Resetting game");
  score = 0;
  dinoPosY = sueloY;
  velY = 0;
  gameVel = 1;
  sueloX = 0;
  obstaculos = [];
  nubes = [];
  textoScore.innerText = `Score: ${score}`;
  suelo.style.left = "0px";
  dino.classList.add("dino-corriendo");
  dino.classList.remove("dino-estrellado");
  contenedor.classList.remove("mediodia", "tarde", "noche");

  if (gameOver) {
    gameOver.style.display = "none";
  }
}

export function Restart() {
  if (score > highScore) {
    document.getElementById("highscore").innerText = "High Score: " + score;
  }

  score = 0;
  dinoPosY = sueloY;
  velY = 0;
  gameVel = 1;
  sueloX = 0;

  obstaculos.forEach((obstaculo) => obstaculo.remove());
  nubes.forEach((nube) => nube.remove());

  obstaculos = [];
  nubes = [];

  textoScore.innerText = `Score: ${score}`;
  suelo.style.left = "0px";
  dino.classList.add("dino-corriendo");
  dino.classList.remove("dino-estrellado");
  contenedor.classList.remove("mediodia", "tarde", "noche");

  if (gameOver) {
    gameOver.style.display = "none";
  }

  parado = false;
  Loop();
}

function Update() {
  if (parado) return;

  MoverDinosaurio();
  MoverSuelo();
  setTimeout(() => {
    DecidirCrearObstaculos();
  }, 200);
  DecidirCrearNubes();
  MoverObstaculos();
  MoverNubes();
  DetectarColision();

  velY -= gravedad * deltaTime;
}

function HandleKeyDown(ev) {
  if (ev.keyCode == 32 || ev.keyCode == 38) {
    Saltar();
  }
}

function Saltar() {
  if (dinoPosY === sueloY) {
    saltando = true;
    velY = impulso;
    dino.classList.remove("dino-corriendo");
  }
}

function MoverDinosaurio() {
  dinoPosY += velY * deltaTime;
  if (dinoPosY < sueloY) {
    TocarSuelo();
  }
  dino.style.bottom = dinoPosY + "px";
}

function TocarSuelo() {
  dinoPosY = sueloY;
  velY = 0;
  if (saltando) {
    dino.classList.add("dino-corriendo");
  }
  saltando = false;
}

function MoverSuelo() {
  sueloX += CalcularDesplazamiento();
  suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalcularDesplazamiento() {
  return velEscenario * deltaTime * gameVel;
}

function Estrellarse() {
  dino.classList.remove("dino-corriendo");
  dino.classList.add("dino-estrellado");
  parado = true;
}
function DecidirCrearObstaculos() {
  workerObstaculos.postMessage({ deltaTime, gameVelWorker: gameVel });
}

function DecidirCrearNubes() {
  workerNubes.postMessage({ tiempoHastaNube, deltaTime });
}

function CrearObstaculo() {
  let obstaculo = document.createElement("div");
  contenedor.appendChild(obstaculo);
  obstaculo.classList.add("cactus");

  if (Math.random() > 0.5) {
    obstaculo.classList.add("cactus2");
  }

  obstaculo.posX = contenedor.clientWidth;
  obstaculo.style.left = contenedor.clientWidth + "px";

  obstaculos.push(obstaculo);

  ultimaPosicionObstaculo = contenedor.clientWidth - obstaculo.posX;
}

function CrearNube() {
  let nube = document.createElement("div");
  contenedor.appendChild(nube);
  nube.classList.add("nube");
  nube.posX = contenedor.clientWidth;
  nube.style.left = contenedor.clientWidth + "px";
  nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px";

  nubes.push(nube);
  tiempoHastaNube =
    tiempoNubeMin + (Math.random() * (tiempoNubeMax - tiempoNubeMin)) / gameVel;
}

function MoverObstaculos() {
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
      obstaculos[i].parentNode.removeChild(obstaculos[i]);
      obstaculos.splice(i, 1);
      GanarPuntos();
    } else {
      obstaculos[i].posX -= CalcularDesplazamiento();
      obstaculos[i].style.left = obstaculos[i].posX + "px";
    }
  }
}

function MoverNubes() {
  for (let i = nubes.length - 1; i >= 0; i--) {
    if (nubes[i].posX < -nubes[i].clientWidth) {
      nubes[i].parentNode.removeChild(nubes[i]);
      nubes.splice(i, 1);
    } else {
      nubes[i].posX -= CalcularDesplazamiento() * velNube;
      nubes[i].style.left = nubes[i].posX + "px";
    }
  }
}

function GanarPuntos() {
  score++;
  textoScore.innerText = `Score: ${score}`;
  if (score == 5) {
    gameVel = 1.5;
    contenedor.classList.add("mediodia");
  } else if (score == 10) {
    gameVel = 2;
    contenedor.classList.add("tarde");
  } else if (score == 20) {
    gameVel = 3;
    contenedor.classList.add("noche");
  }
  suelo.style.animationDuration = 3 / gameVel + "s";
}

function GameOver() {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  Estrellarse();
  gameOver.style.display = "block";
}

function DetectarColision() {
  for (let i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
      break;
    } else {
      const aRect = dino.getBoundingClientRect();
      const bRect = obstaculos[i].getBoundingClientRect();
      collisionWorker.postMessage({
        aRect,
        bRect,
        paddingTop: 10,
        paddingRight: 30,
        paddingBottom: 15,
        paddingLeft: 20,
      });
    }
  }
}



export function rival() {
    const rival = document.createElement("div");
    rival.classList.add("dino", "dino-corriendo"); 
    rival.style.position = "absolute"; 
    rival.style.left = "150px"; 
    rival.style.bottom = "22px"; 

    document.body.appendChild(rival);

    
    const moverRival = () => {
        const velocidadRival = 0.5; 
        rival.style.left = `${parseInt(rival.style.left) + velocidadRival}px`;

        requestAnimationFrame(moverRival);
    };

    console.log(parado)

    moverRival();
}