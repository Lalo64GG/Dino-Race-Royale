import { musicConfiguration } from "./musicConfiguration.js";
import { controllsConfiguration } from "./controllsConfiguration.js";
import { userContent } from "./userContent.js";
import { Loop, rival, Start } from "../gameLogic.js";
import { initWebSocket, sendData } from "../initWebSocket.js";
import { createRoom } from "../createRoom.js";
import { dinoPosY } from "../gameLogic.js";
import { roomContent } from "./roomContent.js";

let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalContent = document.getElementById("modal-content");

export const createModalConfiguration = () => {
  modal.style.display = "block";
  modal.style.opacity = "1";
  modal.style.pointerEvents = "auto";
  modalTitle.innerHTML = "Configuration";

  const music = musicConfiguration();
  const controlls = controllsConfiguration();

  modalContent.append(music, controlls);
};

export const createModalMultiPlayer = () => {
  modal.style.display = "block";
  modal.style.opacity = "1";
  modal.style.pointerEvents = "auto";
  modalTitle.innerHTML = "Multi Player";

  let gameStarted = false;

  const user = userContent();

  let multijugador = document.createElement("section");
  multijugador.style.display = "flex";
  multijugador.style.flexDirection = "column";
  multijugador.style.justifyContent = "center";
  multijugador.style.width = "100%";
  multijugador.style.alignItems = "center";
  multijugador.style.height = "200px";
  multijugador.style.marginTop = "2rem";

  let crearSala = document.createElement("button");
  let unirseSala = document.createElement("button");

  

  crearSala.innerHTML = "Create Room";
  crearSala.classList.add("button");
  unirseSala.innerHTML = "Join Room";
  unirseSala.classList.add("button");

  crearSala.addEventListener("click", async () => {
    let room = createRoom(true)
      multijugador.style.display = "none";

      let contentRoom = document.createElement("div");
      contentRoom.style.display = "flex";
      contentRoom.style.justifyContent = "center";
      contentRoom.style.alignItems = "center";
      contentRoom.style.flexDirection = "column";
      contentRoom.style.width = "auto";
      contentRoom.style.padding = "1rem";

      let titleCrear = document.createElement("h2");
      titleCrear.innerHTML = "Room: " + room;
      let gamers = document.createElement("p");
      gamers.style.marginTop = "1rem";
      gamers.style.color = "white";

      initWebSocket(room);
   
      setInterval(() => {
        fetch(`https://dinoraceroyale.zapto.org/clients/?room=${room}`)
        .then((response) => response.json())
        .then((data) => {
          gamers.innerHTML = "Jugadores conectados: " + data.clientes
        });
      },1000)


      let button = document.createElement('button');
      sendData({type: 'position', data: dinoPosY})
      button.innerHTML = "Play";
      button.classList.add("button");
      button.addEventListener('click', () => {
        sendData({type: 'start', room: room});
          if (!gameStarted) {
              modal.style.display = "none";
              Start();
              gameStarted = true;
              Loop();
              rival();
          }
      });

      contentRoom.append(titleCrear, gamers, button);
      modalContent.append(contentRoom);
  });

  unirseSala.addEventListener("click", () => {
    let contentRoom = roomContent();
    document.body.appendChild(contentRoom);
});

  multijugador.append(user, crearSala, unirseSala);
  modalContent.append(multijugador);
};
