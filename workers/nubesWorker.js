let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;

self.onmessage = function (e) {
    let { tiempoHastaNube, deltaTime } = e.data;

    tiempoHastaNube -= deltaTime;
    if (tiempoHastaNube <= 0) {
        self.postMessage({ action: 'crearNube' });

        tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin);
    }
    self.postMessage({ tiempoHastaNube });
};
