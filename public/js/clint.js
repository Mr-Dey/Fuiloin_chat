//io from socket server
<<<<<<< HEAD

const socket = io("https://fuiloin-chat-supreview.koyeb.app/");

=======
// const socket = io("http://127.0.0.1:3000");
// const socket = io("https://fuiloin-chat-supreview.koyeb.app/");
const socket = io("http://192.168.1.41:3000");
>>>>>>> beta
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

<<<<<<< HEAD
    let UserMessageDiv=document.createElement("div");
    UserMessageDiv.classList.add("text");
    UserMessageDiv.innerText=message;

=======
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
    UserNameDiv.classList.add("username");
    UserNameDiv.classList.add(`name-${position}`);
    UserNameDiv.innerText=username;

    let UserMessageDiv=document.createElement("div");
    UserMessageDiv.classList.add("text");
    UserMessageDiv.innerText=message;

>>>>>>> beta
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

<<<<<<< HEAD
=======








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

>>>>>>> beta
