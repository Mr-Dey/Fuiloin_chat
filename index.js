const express = require("express");
const http=require("http");
const app=express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io=socketIO(server);

//very importent because only this folder will be public so index.html should be inside this folder along with requirements.
app.use(express.static('public'));
app.get("/socket",(req,res)=>{
  res.sendFile(__dirname+"/node_modules/socket.io/client-dist/socket.io.js");
})


//Properities
const users={};

//messagesStoreHere
const StoreMessages=[];

//io logic
io.on("connection",(socket)=>{
  //userJoined
    socket.on("new-user-joined",(name)=>{
      console.log(name+" has joined the chat!");
      users[socket.id]=name;
      socket.emit("load-messages",StoreMessages);
      socket.broadcast.emit("user-joined",name);
    })
    //Receved-And-sendMessage
    socket.on("send-message",(message)=>{
      StoreMessages.push(`${users[socket.id]} : ${message}`);
      socket.broadcast.emit("receved-message",{
        message:message,
        name:users[socket.id]//the name will be taken from dictionary
      });
    })
  })
  io.on("disconnect",(socket)=>{
    console.log("userDisconnected");
  })


  //server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

