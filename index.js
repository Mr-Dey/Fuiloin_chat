const express = require("express"); //requre for function handelling through http server.
const http=require("http");// to connect socket io http is needed.
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
let MessageCount=0;
const oldMessages={};
const StoreMessages=(name,message)=>{
  oldMessages[MessageCount]={
    name:name,
    message:message
  };
  MessageCount++;
}

//io logic
io.on("connection",(socket)=>{
  //userJoined
    socket.on("new-user-joined",(name)=>{
      console.log(name+" has joined the chat!");
      users[socket.id]=name;
      socket.emit("load-messages",oldMessages);
      StoreMessages(name,`${name} has joined the chat!`);
      socket.broadcast.emit("user-joined",name);
    })
    //Receved-And-sendMessage
    socket.on("send-message",(message)=>{
      StoreMessages(users[socket.id],message);
      socket.broadcast.emit("receved-message",{
        name:users[socket.id],
        message:message
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

