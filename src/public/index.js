const socket = io();
let user;
let textColor = "";
let logInButton = document.getElementById('logInButton');
let chatBox = document.getElementById('chatBoxInput');
let inputColor = document.getElementById('chatBoxColor');
let chatButton = document.getElementById('chatBoxButton');


const sendMessage = () => {
    if (user === undefined) {
        socket.emit('message', { user: 'GOD', message: '<p style="color:red";>Por favor identificate para enviar mensajes.</p>' })
        chatBox.value = "";
        return
    }
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { user: user, message: chatBox.value.trim() })
        chatBox.value = "";
    }
}

logInButton.addEventListener('click', () => {

    if (logInButton.innerHTML==="Iniciar sesión"){
        
        Swal.fire({
        title: "Identifícate",
        input: "text",
        text: "Ingresa el nombre de usuario que utilizarás en el chat",
        inputValidator: (value) => {
            if (value==="GOD") return "No, no podes ser GOD bobi."
            if (value.length > 10) return "El usuario tiene que tener menos de 10 dígitos."
            return !value && "!!PERO DECIME QUIEN SOS CARAJO!!";
        },
        allowOutsideClick: false
    }).then(result => {
        user = result.value;
        socket.emit('registered', user);
        socket.emit('message',{user:"GOD", message:`Hola ${user} kpo, bienvenido al server del pitu10.`});
        socket.emit('message', { user: "GOD", message: (`<p style="color:green";>${user} ha iniciado sesión.</p>`).toUpperCase() });
        logInButton.innerHTML = 'Cambiar Usuario';
    })
}
    else{
        Swal.fire({
            title: "Elige tu nuevo nombre de usuario",
            input: "text",
            text: "Ingresa el nombre de usuario que utilizarás en el chat",
            inputValidator: (value) => {
                if (value==="GOD") return "No, no podes ser GOD bobi."
                if (value.length > 10) return "El usuario tiene que tener menos de 10 dígitos."
                return !value && "!!PERO DECIME QUIEN SOS CARAJO!!";
            },
            allowOutsideClick: false
        }).then(result => {
            let newUser = result.value
            socket.emit('registered', newUser);
            socket.emit('message', { user: 'GOD', message: `<p style="color:blue";><span style="font-weight:bold;text-transform:uppercase;">${user}</span> ha cambiado su nombre de usuario por <span style="font-weight:bold;text-transform:uppercase;">${newUser}</span> .</p>`});
            user = newUser;
        })
    }
})

chatButton.addEventListener('click', () => {
    sendMessage();
})

inputColor.addEventListener('change', (e) => {
    textColor = e.target.value;
})


chatBox.addEventListener('keyup', (evt) => {

    if (evt.key === "Enter") {
        sendMessage();
    }
})




//SOCKETS

socket.on('newUser', data => {
    
    Swal.fire({
        icon: "success",
        text: "Nuevo usuario conectado",
        toast: true,
        position: "top-right",
    })

})


socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `<div style="display:flex;"><p>${message.user}: </p><p style="color:${textColor};"> ${message.message}</p></div></br>`;
    })
    log.innerHTML = messages;
})


