//io from socket server
// const socket = io("http://127.0.0.1:3000");
const socket = io("http://192.168.1.41:3000");
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


//Future Work
//buttonClicked
// sendButton.addEventListener('click',()=>{
//     sendButton.addClassList
// })


//appendMessageToHtml(old)
// const appendMessage=(message,position)=>{
//     const childDiv=document.createElement("div");
//     childDiv.innerText=message;
//     childDiv.classList.add("message");
//     childDiv.classList.add(position);
//     messageContainer.append(childDiv);
// }

const appendMessage=(username,message,position)=>{
    let UserNameDiv=document.createElement("div");
    UserNameDiv.innerText=username;
    let UserMessageDiv=document.createElement("div");
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
    appendMessage(Name,`User : ${Name} has joined the chat.`,"left");
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









//del
// const messageContainer=document.querySelector(".container");
// const messageInput=document.querySelector("#messageInp");
// const appendMessage=(username,message,position)=>{
//     let UserNameDiv=document.createElement("div");
//     UserNameDiv.innerText=username;
//     let UserMessageDiv=document.createElement("div");
//     UserMessageDiv.innerText=message;
//     let Message=document.createElement("div");
//     Message.appendChild(UserNameDiv);
//     Message.appendChild(UserMessageDiv);
//     Message.classList.add("message");
//     Message.classList.add(position);
//     messageContainer.appendChild(Message);
// }
// messageInput.addEventListener("click",()=>{
//     console.log("working");
//     appendMessage("Mr-Dey","This is a test function","right");
//     appendMessage("Mr-Rony","This is a test function2","left");
// })

