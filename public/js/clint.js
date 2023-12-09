//io from socket server
const socket = io("http://127.0.0.1:3000");
console.log("live");

const Name=prompt("What is your name?");
socket.emit("new-user-joined",Name);

const container=document.querySelector(".container");

const newDiv=document.createElement("div");




socket.on("user-joined",Name=>{
    console.log("This is the Client Function "+Name);
})
