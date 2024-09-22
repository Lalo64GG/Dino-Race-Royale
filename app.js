import { createModalConfiguration, createModalMultiPlayer } from "./src/components/modal.js";
import { Loop, Start, Restart } from "./src/gameLogic.js";


let highScore;

if(localStorage.getItem("highscore") !== null){
    highScore = localStorage.getItem('highScore');
}

let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal-content");

let gameStarted = false;

document.getElementById("btn-start").addEventListener("click", () => {
    if (!gameStarted) {
        if(highScore !== null) {
            document.getElementById("highscore").innerText = "High Score: " + highScore;
        }
        document.getElementById("presentation").style.display = "none"
        document.getElementById("score").style.display = ""
        Start();
        gameStarted = true; 
        Loop();
    }
})

document.getElementById("btn-configuration").addEventListener("click", () => {
    document.getElementById("presentation").style.display = "none"
    createModalConfiguration()
})

document.getElementById("btn-multiplayer").addEventListener("click", () => {
    document.getElementById("presentation").style.display = "none"
    createModalMultiPlayer()
})


document.getElementById("btn-close").addEventListener("click", () => {
    modal.style.display = "none";
    document.getElementById("presentation").style.display = ""
    modalContent.innerHTML = ""
    
})

document.getElementById("btn-reset").addEventListener("click", () => {
    Restart()
})

