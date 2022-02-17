const socket = io();
let user;
let chatBox = document.getElementById('chatBoxInput');
let inputColor = document.getElementById('chatBoxColor');
let textColor = "";


inputColor.addEventListener('change',(e)=>{

    textColor = e.target.value;
})

Swal.fire({
    title:"Identifícate",
    input:"text",
    text:"Ingresa el nombre de usuario que utilizarás en el chat",
    inputValidator: (value)=>{
        return !value && "!!PERO DECIME QUIEN SOS CARAJO!!"
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value;
    socket.emit('registered',user);
})

chatBox.addEventListener('keyup',(evt)=>{

    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user:user,message:chatBox.value.trim()})
            chatBox.value="";
        }
    }
})

//SOCKETS

socket.on('newUser',(data)=>{

    alert("New user");
    
    Swal.fire({
        icon:"success",
        text:"Usuario nuevo conectado",
        toast:true,
        position:"top-right",
    })
})
socket.on('log',data=>{
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message=>{
        messages  = messages+ `<p style="color:${textColor};">${message.user}: ${message.message}</p></br>`;
    })
    log.innerHTML = messages;
})