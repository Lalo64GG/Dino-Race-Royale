import { initWebSocket } from "../initWebSocket.js";

export const roomContent = () => {
    let roomContentDiv = document.createElement("div");
  
    roomContentDiv.style.backgroundColor = "#F1EDED";
    roomContentDiv.style.display = "flex";
    roomContentDiv.style.alignItems = "center";
    roomContentDiv.style.justifyContent = "center";
    roomContentDiv.style.flexDirection = "column";
    roomContentDiv.style.height = "200px";
    roomContentDiv.style.width = "400px";
    roomContentDiv.style.borderRadius = "10px";
    roomContentDiv.style.padding = "1rem";
    roomContentDiv.style.zIndex = "9999999";
    roomContentDiv.style.position = "fixed";
    roomContentDiv.style.top = "50%";
    roomContentDiv.style.left = "50%";
    roomContentDiv.style.transform = "translate(-50%, -50%)";
  
    const titleRoomTitle = document.createElement("h2");
    titleRoomTitle.innerHTML = "Introduce el número de la sala";
    titleRoomTitle.style.fontWeight = "normal";
  
    let roomInput = document.createElement("input");
    roomInput.style.width = "100%";
    roomInput.style.marginTop = "1rem";
    roomInput.style.border = "1px solid #ccc";
    roomInput.style.borderRadius = "8px";
    roomInput.style.padding = "0.75rem 0";
    roomInput.style.fontSize = "1rem";
    roomInput.style.color = "#333";
    roomInput.style.outline = "none";
    roomInput.style.transition = "all 0.3s ease";
    roomInput.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  
    // Estilo al hacer focus
    roomInput.addEventListener("focus", () => {
      roomInput.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
      roomInput.style.borderColor = "#007bff";
    });
  
    roomInput.addEventListener("blur", () => {
      roomInput.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      roomInput.style.borderColor = "#ccc";
    });
  
    let joinButton = document.createElement("button");
    joinButton.innerHTML = "Unirse a la sala";
    joinButton.style.backgroundColor = "#0056b3";
    joinButton.style.margin = "1rem";
    joinButton.classList.add("button");
  
    joinButton.addEventListener("click", () => {
      if (roomInput.value === "") {
        return;
      }
      const roomNumber = roomInput.value;
      initWebSocket(roomNumber)
      roomContentDiv.style.display = "none"
    
    });
  
    roomContentDiv.append(titleRoomTitle, roomInput, joinButton);
    return roomContentDiv;
  };
  