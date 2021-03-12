const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, { origins: '*:*'});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

io.on('connection', socket => {

  let roomId = 0;
  let userName = "";
  let userId=1;
  
  //joining in a room
  socket.on('joinroom', function(data) {
    roomId = data.room;
    userName = data.name;
    socket.join(roomId);
    socket.to(roomId).emit('userjoined', userName)
  });

  socket.on('userjoined', function() {
    userId+=1;
  });

  socket.on('userleft', function(data) {
    if(data.userId<userId) userId-=1;
  });

  socket.on('message', (message) => {
    socket.to(roomId).emit('message', message)
  })

  socket.on('chatmessage', (data) => {
    socket.to(roomId).emit('chatmessage', data)
  })

  socket.on('disconnect', ()=> {
    socket.to(roomId).emit('userleft', { userId, userName })
  })
})

app.get("/", (req, res) => {
  res.send({ response: "Server is up and Running." }).status(200);
});

server.listen(process.env.PORT || 4000, function() {
  console.log('server is working')
})
