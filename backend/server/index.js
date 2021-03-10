const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

// set up domain for local development
io.origins(["http://localhost:3000"]);

app.use(cors());

io.on("connection", (socket) => {
  let roomId = 0;
  let userName = "";
  //joining in a room
  socket.on("joinroom", function (data) {
    const { name, room } = data;
    roomId = room;
    userName = name;

    socket.userName = name;
    socket.join(roomId);

    console.log(socket.id, data);
    // add user
    var clients = io.sockets.adapter.rooms[roomId].sockets;
    console.log(clients);
    let users = {};
    for (clientId in clients) {
      //this is the socket of each client in the room.
      const clientSocket = io.sockets.connected[clientId];
      if (clientSocket.userName) users[clientId] = clientSocket.userName;
    };
    
    console.log(users);
    socket.emit("Users Data", users);
    socket.to(roomId).emit("userjoined", userName);
  });

  socket.on("message", (message) => {
    console.log(message);
    socket.to(roomId).emit("message", message);
  });

  socket.on("chatmessage", (data) => {
    console.log(data);
    socket.to(roomId).emit("chatmessage", data);
  });

  socket.on("disconnect", function () {
    socket.to(roomId).emit("userleft", userName);
  });
});

app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

server.listen(process.env.PORT || 4000, function () {
  console.log("server is working");
});
