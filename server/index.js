const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected.`);
  socket.on('room_id', data => {
    console.log('inside room_id message');
    console.log(data);
    socket.data.room_id = data.room_id;
    console.log(`socket.data is:`);
    console.log(socket.data);
    socket.join(data.room_id);
  });

  socket.on('new_message', (data) => {
    console.log('inside new_message message');
    console.log(data.room_id);
    console.log(socket.rooms);
    socket.to(data.room_id).emit('broadcast_message', {message: data.message});
  })
});

httpServer.listen(3001, () => {
  console.log('SERVER 2 IS RUNNING');
});
