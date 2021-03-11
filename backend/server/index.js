const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const Rooms = require("./Utils/Rooms");
const rooms = new Rooms();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

io.on("connection", (socket) => {
  let roomId = 0;
  let userName = "";
  let userId=1;
  
  //joining in a room
  socket.on("joinroom", function ({ name, room }) {
    if (!name) return;

    roomId = room;
    userName = name;

    socket.join(room);

    rooms.addUserToRoom(socket.id, name, room);
    const users = rooms.getAllUsers(room);
    // console.log("The current user is :", userName, room, users);

    // send all the users to only the current user
    socket.emit("addusers", { id: socket.id, users });
    // inform everyone the user is here
    socket.broadcast.to(roomId).emit("userjoined", { [socket.id]: name });
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
    if (!userName) return;
    console.log("The User has been disconnected:", userName);
    const returnId = rooms.deleteUser(roomId, socket.id);
    console.log(returnId);
    if (returnId)
      socket.broadcast
        .to(roomId)
        .emit("userleft", { id: returnId, name: userName });
  });
});

app.get("/", (req, res) => {
  res.send({ response: "Server is up and Running." }).status(200);
});

server.listen(process.env.PORT || 4000, function() {
  console.log('server is working')
})
