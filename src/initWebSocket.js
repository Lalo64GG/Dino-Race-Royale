let ws;
let salaTerminada = false;


export const initWebSocket = (room) => {
   

    ws = new WebSocket(`ws://localhost:8080/ws?room=${room}`);

    ws.onopen = () => {
        console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received: ", data);
    };

    ws.onclose = () => {
        console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error: ", error);
    };
};

export const sendData = (data) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    } else {
        console.error("WebSocket is not open. Cannot send data.");
    }
};

export const messageReceived = () => {
    let data 
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.onmessage = (event) => {
           data = JSON.parse(event.data)
            console.log("Message received: ", data);
        }
    } else {
        console.error("WebSocket is not open. Cannot send data.");
    }
    return data
}

export const closeWebSocket = () => {
    if (ws) {
        ws.close();
    }
};
