let currentRoom;

export const createRoom = (generateNew = false) => {
    if (generateNew || currentRoom === undefined) {
        currentRoom = Math.floor(Math.random() * 500);
        console.log("New room created: ", currentRoom);
    } else {
        console.log("Using existing room: ", currentRoom);
    }
    return currentRoom;
};
