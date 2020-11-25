const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors');


app.use(cors());

io.on('connection', socket => {

  let roomId = 0;
  let userName = "";
  
  //joining in a room
  socket.on('joinroom', function(data) {
    roomId = data.room;
    userName = data.name;
    socket.join(roomId);
    socket.to(roomId).emit('userjoined', userName)
  });

  socket.on('message', (message) => {
    socket.to(roomId).emit('message', message)
  })

  socket.on('chatmessage', (data) => {
    socket.to(roomId).emit('chatmessage', data)
  })

  socket.on('disconnect', function() {
    socket.to(roomId).emit('userleft', userName)
  })
})


server.listen(process.env.PORT || 4000, function() {
  console.log('server is working')
})