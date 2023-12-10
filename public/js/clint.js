//io from socket server
const socket = io("http://127.0.0.1:3000");
console.log("live");

//prompt
const Name=prompt("What is your name?");
socket.emit("new-user-joined",Name);

//html properties
const messageContainer=document.querySelector(".container");


const appendMessage=(message,position)=>{
    const childDiv=document.createElement("div");
    childDiv.innerText=message;
    childDiv.classList.add("message");
    childDiv.classList.add(position);
    messageContainer.append(childDiv);
}

appendMessage("may","right");



socket.on("user-joined",Name=>{
    console.log("New user joined "+Name);
})
