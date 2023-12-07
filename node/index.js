//nodeserver to handel socket io connection
console.log("connected index.js");

// const { Socket, Server } = require("socket.io");


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile("D:/coading/HTML CSS JAVASCRIPT/GitHub/fulloin_chat/node/node_modules/socket.io/client-dist/socket.io.js");
    // res.sendFile('<h1>hello world</h1>');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });

// const io= require("socket.io")(8000)


// const users={};



// io.on('connection',socket=>{
//     socket.on("new-user-join",name=>{
//         users[socket.id]=name;
//         socket.brodcast.emit('user-joined',name);
//     })
//     socket.on("send",message=>{
//         socket.brodcast.emit("receive",{message:message,name:users[socket.id]})
//     })
// })
