//io from socket server
const socket = io("http://127.0.0.1:3000");
console.log("live");

//prompt
const Name=prompt("What is your name?");
socket.emit("new-user-joined",Name);

//html properties
const messageContainer=document.querySelector(".container");
const sendButton=document.querySelector(".button");
const messageInput=document.querySelector("#messageInp");
const form=document.querySelector(".inputform");


//buttonClicked
// sendButton.addEventListener('click',()=>{
//     sendButton.addClassList
// })

const appendMessage=(message,position)=>{
    const childDiv=document.createElement("div");
    childDiv.innerText=message;
    childDiv.classList.add("message");
    childDiv.classList.add(position);
    messageContainer.append(childDiv);
}

//prevent form default-Behaviour
form.addEventListener("submit",(e)=>{
    e.preventDefault();
})

const submitBtn=()=>{
    let message=messageInput.value;
    if(message.trim().length>0){
        appendMessage(message,"right");
        socket.emit("send-message",message,Name);
        messageInput.value="";
        messageContainer.scrollTop=messageContainer.scrollHeight;
    }
}

socket.on("user-joined",Name=>{
    console.log("New user joined "+Name);
    appendMessage(`user name ${Name} joined the chat.`,"left");
})

socket.on("receved-message",(message,name)=>{
    appendMessage(`${name} : ${message}`,"left");
})