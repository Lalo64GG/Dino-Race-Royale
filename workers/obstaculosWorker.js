let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let gameVel = 1;

self.onmessage = function (e) {
    const { deltaTime, gameVelWorker } = e.data;
    gameVel = gameVelWorker; 

    tiempoHastaObstaculo -= deltaTime;

    if (tiempoHastaObstaculo <= 0) {
        self.postMessage({ action: 'crearObstaculo' });
        tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
    }
};
