//io from socket server
const socket = io("https://fuiloin-chat-supreview.koyeb.app/");
console.log("live");

//prompt
const prompt=document.querySelector(".entry-prompt");
const nameInp=document.querySelector("#nameInp");
const entryForm=document.querySelector(".entrypoint");
const loginbtn=document.querySelector("#loginbtn");


let Name="Default";
entryForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(nameInp.value.trim().length>0){
        Name=nameInp.value;
        prompt.style.display="none";
        //OnNewUserJoined
        socket.emit("new-user-joined",Name);
    }
})

//html properties
const messageContainer=document.querySelector(".container");
const sendButton=document.querySelector(".button");
const messageInput=document.querySelector("#messageInp");
const form=document.querySelector(".inputform");


const appendMessage=(username,message,position)=>{
    let UserNameDiv=document.createElement("div");
    UserNameDiv.classList.add("username");
    UserNameDiv.classList.add(`name-${position}`);
    UserNameDiv.innerText=username;

    let UserMessageDiv=document.createElement("div");
    UserMessageDiv.classList.add("text");
    UserMessageDiv.innerText=message;

    let Message=document.createElement("div");
    Message.appendChild(UserNameDiv);
    Message.appendChild(UserMessageDiv);
    Message.classList.add("message");
    Message.classList.add(position);
    messageContainer.appendChild(Message);
}


//prevent form default-Behaviour
form.addEventListener("submit",(e)=>{
    e.preventDefault();
})

//User joined
socket.on("user-joined",(Name)=>{
    appendMessage(Name,`${Name} has joined the chat.`,"left");
    messageContainer.scrollTop=messageContainer.scrollHeight;
})

//LoadOldMessages
socket.on("load-messages",(oldMessage)=>{
    for(slNo in oldMessage){
        appendMessage(oldMessage[slNo].name,oldMessage[slNo].message,"left");
    }
})
//send message
const submitBtn=()=>{
    let message=messageInput.value;
    if(message.trim().length>0){
        appendMessage("you",message,"right");
        socket.emit("send-message",message);
        messageInput.value="";
        messageContainer.scrollTop=messageContainer.scrollHeight;
    }
}

//receive message
socket.on("receved-message",data=>{
    appendMessage(data.name,data.message,"left");
    messageContainer.scrollTop=messageContainer.scrollHeight;
})
