const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, { origins: "*:*" });
const helmet = require('helmet');
const rateLimiter = require('./rateLimiter');
const handleSocket = require('./Utils/Socket');
// instantiate a new rooms object to store all clients in the room

app.use(helmet());

// io.origins(["http://localhost:3000"]);
app.use(cors());

io.on("connection", (socket) => handleSocket(socket));

app.get("/", rateLimiter, (req, res) => {
  res.send({ response: "Server is up and Running." }).status(200);
});

server.listen(process.env.PORT || 4000, function () {
  console.log("server is working");
});
