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

//io logic
io.on("connection",(socket)=>{
    socket.on("new-user-joined",name=>{
      console.log(name+" has joined the chat!");
      users[socket.id]=name;
      socket.broadcast.emit("user-joined",name);
    })

  })
  
  

  //server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

