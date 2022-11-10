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
  socket.on('new_message', (data) => {
    console.log(data);
    socket.broadcast.emit('broadcast_message', data);
  })
});

httpServer.listen(3001, () => {
  console.log('SERVER 2 IS RUNNING');
});
