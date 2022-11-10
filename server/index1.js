const express = require('express');
const expressApp = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

expressApp.use(cors());
expressApp.get('/', (req, res) => {
  res.send('Hello World woot!')
})

expressApp.get('/foo', (req, res) => {
  res.send('Hello World foo1!')
})

expressApp.get('/bar', (req, res) => {
  res.send('Hello World bar1!')
});

const expressServer = http.createServer(expressApp);
const io = new Server(expressServer, {
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

expressServer.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
