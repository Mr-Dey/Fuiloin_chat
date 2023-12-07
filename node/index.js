//nodeserver to handel socket io connection
console.log("connected index.js");

const { Socket, Server } = require("socket.io");
// import { Server } from "socket.io";

const io= require("socket.io")(8000)
// const io = new Server(3000);

const users={};

io.on('connection',socket=>{
    socket.on("new-user-join",name=>{
        users[socket.id]=name;
        socket.brodcast.emit('user-joined',name);
    })
    socket.on("send",message=>{
        socket.brodcast.emit("receive",{message:message,name:users[socket.id]})
    })
})
