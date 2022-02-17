const socket = io();
let chatBox = document.getElementById('chatBox')
let user;

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa el nombre de usuario que utilizaras en el chat",
    inputValidator:(value)=>{
        return !value && "Necesitas identificarte para poder usar el chat! =<"
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value;
})

chatBox.addEventListener('keyup',(evt)=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user:user,message:chatBox.value})
            chatBox.value=""
        }
    }
})

//sockets

socket.on('newUser',(data)=>{
    Swal.fire({
        icon:'success',
        text:'Nuevo usuario conectado',
        toast:true,
        position:"top-right"
    })
})

socket.on('log',data=>{
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message=>{
        message = messages+ `${message.user} dice ${message.message}`;
    })
    log.innerHTML = messages;
})