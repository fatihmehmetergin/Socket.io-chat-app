const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket =>
 {
    
    socket.on('new-user', name =>  {
    console.log("kullanici connect oldu "+name)
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message',message => {
    console.log("kullanici cikis yaptı"+{ message: message, name: users[socket.id] })
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })

  })
  socket.on('disconnect', () => 
  {
    console.log("kullanici cikis yaptı"+users[socket.id])
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  });
});