const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

const socketServer = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  socketServer.adapter(createAdapter(pubClient, subClient));

  socketServer.on("connection", (socket) => {
    console.log(`User ${socket.id} connected.`);
    socket.on("room_id", (data) => {
      console.log("inside room_id message");
      console.log(data);
      socket.data.room_id = data.room_id;
      console.log(`socket.data is:`);
      console.log(socket.data);
      socket.join(data.room_id);
    });

    socket.on("new_message", (data) => {
      console.log("inside new_message message");
      console.log(data.room_id);
      console.log(socket.rooms);
      socketServer
        .to(data.room_id)
        .emit("broadcast_message", { message: data.message });
    });

    socket.on("disconnect", (reason) => {
      console.log(
        `Socket ${socket.id} is disconnect; the reason is: ${reason}`
      );
    });
  });

  const port = process.env.PORT || 3001;
  socketServer.listen(port);
  console.log(`SERVER IS RUNNING on port ${port}`);
});
