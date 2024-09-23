import { handleReceivedMessage } from "./components/roomContent.js";

let ws;
let mensajeRecibido = null; 


export const initWebSocket = (room) => {
    ws = new WebSocket(`ws://44.223.173.166/ws?room=${room}`);

    ws.onopen = () => {
        console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received: ", data);
        mensajeRecibido = data;
        handleReceivedMessage(data); 
    };

    ws.onclose = () => {
        console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error: ", error);
    };
};

// Envía datos solo si el WebSocket está abierto
export const sendData = (data) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    } else {
        console.error("WebSocket is not open. Cannot send data.");
    }
};


// Cerrar el WebSocket
export const closeWebSocket = () => {
    if (ws) {
        ws.close();
    }
};