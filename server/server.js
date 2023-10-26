const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your allowed origin(s)
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
const chatRooms = {};

app.get("/rooms", (req, res) => {
  const activeRooms = Object.keys(chatRooms);
  res.json(activeRooms);
});

io.on("connection", (socket) => {

  socket.on("joinRoom", (room) => {
    if (!chatRooms[room]) {
      chatRooms[room] = { messages: [] };
      socket.emit("reciveHistory", []);
    } else {
      socket.emit("reciveHistory", chatRooms[room].messages);
    }

    socket.join(room);
    socket.emit("join", room);
  });

  socket.on("sendMessage", (message) => {
    chatRooms[message.room]?.messages.push(message);
    socket.to(message.room).emit("reciveMessage", message);
  });

  socket.on("disconnect", (room) => {
    socket.leave(room)
  });
});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});
