//nodeserver to handel socket io connection

const { Socket } = require("socket.io")

const io= require("socket.io")(8080)

const users={}

io.on('connection',socket=>{
    socket.on("new-user-join",name=>{
        users[socket.id]=name;
        socket.brodcast.emit('user-joined',name);
    })
    socket.on("send",message=>{
        socket.brodcast.emit("receive",{message:message,name:users[socket.id]})
    })
})
