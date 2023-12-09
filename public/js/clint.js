const socket = io();
const Name=prompt("What is your name?");
socket.emit("new-user-joined",Name);

socket.on("user-joined",Name=>{
    console.log("This is the Client Function"+Name);
})