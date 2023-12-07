const express = require("express");
const http=require("http");
const app=express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io=socketIO(server);
app.use(express.static('public'));

io.on("connection",(socket)=>{
    console.log("a new user joined");
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// app.use(express.static('public'));

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle chat messages
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg); // Broadcast the message to all connected clients
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
