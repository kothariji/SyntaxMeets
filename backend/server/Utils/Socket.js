const Rooms = require("./Rooms");
const rooms = new Rooms();


let roomId = 0;
let userName = "";
let userId = 1;

const handleSocket = (socket) => {
    //joining in a room
    socket.on("joinroom", function ({ name, room }) {
        if (!name) return;

        roomId = room;
        userName = name;
        userId = socket.id;
        socket.join(room);

        const oldUser = rooms.getUser(roomId);
        rooms.addUserToRoom(socket.id, name, room);
        const users = rooms.getAllUsers(room);
        // send all the users to only the new User who joined and id of the current user
        socket.emit("addusers", { id: socket.id, users });
        // inform everyone (excluding the new User) , that a user has been added
        // also send the id of an already existing user to the client so only that one
        // will emit the code to update for the new user
        //     console.log(users);
        socket.broadcast
            .to(roomId)
            .emit("userjoined", { newUser: { [socket.id]: name }, oldUser });
    });

    socket.on("message", (message) => {
        // Send the code in text editor to all the sockets
        socket.to(roomId).emit("message", message);
    });

    socket.on("typing", (user) => {
        // inform everyone (excluding the typing user himself) who is typing
        socket.broadcast.to(roomId).emit("typing", user);
    });

    socket.on("chatmessage", (data) => {
        // send the chat message to all the users
        socket.to(roomId).emit("chatmessage", data);
    });

    socket.on("disconnect", function () {
        if (!userName) return;

        const returnId = rooms.deleteUser(roomId, socket.id);
        if (returnId)
            socket.broadcast
                .to(roomId)
                .emit("userleft", { id: returnId, name: userName });
    });
}

module.exports = handleSocket;