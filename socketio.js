const socketio = require("socket.io");

const initSocketIO = (server) => {
  const io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_PORT ?? "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected:", socket.id);

    // socket.join("help-chat");

    socket.on("connect", (data) => {
      socket.broadcast.emit("user_join", data);
    });

    socket.on("chat_message", (data) => {
      console.log("data from chat_message:", data);

      socket.broadcast.emit("chat_message", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("client disconnected due to reason:", reason);
    });
  });
};

module.exports = { initSocketIO };
