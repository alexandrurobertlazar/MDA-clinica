isAdmin = false;
switch (role) {
    case "admin":
        document.getElementById("chat-type").innerHTML = "Chat con paciente"
        isAdmin = true;
        break;
    case "patient":
        document.getElementById("chat-type").innerHTML = "Chat con administrador"
        break;
}

function sendMessage() {
    message = {
        msg: document.getElementById("message-send").value,
        admin: isAdmin
    };
    elem = document.getElementById('messages-container')
    elem.scrollTop = elem.scrollHeight;
    if (message.msg.length > 0) {
        if (role == "admin") {
            userId = localStorage.getItem("id")
        } else {
            userId = localStorage.getItem("user_id")
        }
        fetch(`http://127.0.0.1:3000/chats/${userId}`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            }
        })
        .then(function (response) {
            document.getElementById("message-send").value = ''
        })
        .catch(function (error) {
            console.log(error);
        })
        
        
    }
}

function getMessages() {
    if (role == "admin") {
        userId = localStorage.getItem("id")
        if (userId === null) {
            alert("Error: Se debe entrar al chat desde la ventana de gestión de usuarios")
        } else {
            userData = {
                user: userId,
                msgs: []
            }
            fetch(`http://localhost:3000/chats`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async function (response) {
                    if (response !== false) {
                    const json = await response.json()
                    document.getElementById('messages-container').innerHTML = ''
                    for (const message of json.msgs) {
                        document.getElementById('messages-container').innerHTML += buildMessage(message)
                    }
                }   
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    } else {
        userData = {
            user: localStorage.getItem('user_id'),
            msgs: []
        }
        fetch(`http://localhost:3000/chats`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async function (response) {
                if (response !== false) {
                    const json = await response.json()
                    document.getElementById('messages-container').innerHTML = ''
                    for (const message of json.msgs) {
                        document.getElementById('messages-container').innerHTML += buildMessage(message)
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
}

function buildMessage(message) {
    if (message.admin) {
        if (role == "admin") {
            return `
            <div class="w-full flex flex-row justify-end">
                <p class="bg-blue-500 text-white max-w-md rounded-md text-center mt-2 py-2 px-4 break-words">${message.msg}</p>
            </div>`
        } else {
            return `
            <div class="w-full flex flex-row justify-start">
                <p class="text-black max-w-md rounded-md text-center bg-slate-200 mt-2 py-2 px-4 break-words">${message.msg}</p>
            </div>`
        }
    } else {
        if (role == "admin") {
            return `
            <div class="w-full flex flex-row justify-start">
                <p class="text-black max-w-md rounded-md text-center bg-slate-200 mt-2 py-2 px-4 break-words">${message.msg}</p>
            </div>`
        } else {
            return `
            <div class="w-full flex flex-row justify-end">
                <p class="bg-blue-500 text-white max-w-md rounded-md text-center mt-2 py-2 px-4 break-words">${message.msg}</p>
            </div>`
        }
    }
}

// Query messages every 1.5 seconds
// This should have been done with sockets but there was not enough time.
setInterval(function () {
    getMessages();
}, 1500)

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
})