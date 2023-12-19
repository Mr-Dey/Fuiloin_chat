//io from socket server
const socket = io("http://127.0.0.1:3000");
// const socket = io("http://192.168.1.41:3000");
console.log("live");

//prompt
const Name=prompt("What is your name?");

//OnNewUserJoined
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

//User joined
socket.on("user-joined",(Name)=>{
    console.log("New user joined "+Name);
    appendMessage(`User : ${Name} has joined the chat.`,"left");
})

//LoadOldMessages
socket.on("load-messages",(data)=>{
    data.forEach((e)=>{
        appendMessage(e,"left");
    })
})
//send message
const submitBtn=()=>{
    let message=messageInput.value;
    if(message.trim().length>0){
        appendMessage(`${Name} : ${message}`,"right");
        socket.emit("send-message",message);
        messageInput.value="";
        messageContainer.scrollTop=messageContainer.scrollHeight;
    }
}

//receive message
socket.on("receved-message",data=>{
    appendMessage(`${data.name} : ${data.message}`,"left");
    messageContainer.scrollTop=messageContainer.scrollHeight;
})