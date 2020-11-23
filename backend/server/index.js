const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket => {

  var roomId = 0;

  
  //joining in a room
  socket.on('joinroom', function(room) {
    roomId = room;
    socket.join(room);
  });

  socket.on('message', (message) => {
    socket.to(roomId).emit('message', message)
  })

  socket.on('chatmessage', (message) => {
    socket.to(roomId).emit('chatmessage', message)
  })

})

http.listen(4000, function() {
  console.log('listening on port 4000')
})