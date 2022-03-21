const userListElement = document.getElementById("user-list");
const deleteMarkedUsersButton = document.getElementById("delete-marked-users-button");

// List of marked users id
var markedUsers = []

// checkbox action
function checkboxEvent(checkbox) {
    if(checkbox.checked) {
        markedUsers.push(checkbox.value);
    } else { 
        markedUsers = markedUsers.filter(id => id !== checkbox.value);
    }
}

// Event listeners
deleteMarkedUsersButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(markedUsers.length > 0) {
        markedUsers.forEach(async (id) => {
            await fetch(`http://127.0.0.1:3000/users/${id}`, {
                method: "DELETE"
            })
            .then(res => {
                if(!res.ok) {
                    console.log("Error");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if(data.removed) {
                    const oldUserElement = document.getElementById(id);
                    oldUserElement.parentNode.removeChild(oldUserElement);
                } else {
                    console.log("Error");
                }
            });
        });
    }
});

// Custom component for show each user
const userDetailsComponent = (user) => {
    return (`
        <li id=${user.id}>
            <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5">
                <div class="flex flex-col h-full">
                    <div>
                        <input type="checkbox" name="user1" id="user1" value=${user.id} onchange="checkboxEvent(this)">
                        <label class="font-bold text-lg"
                        for=${user.id}>
                            ${user.name}
                        </label>
                    </div>
                    <h5 class="font-light">
                        ${user.email}
                    </h5>
                </div>
                <div class="flex flex-col">
                    <a
                    class="bg-blue-500 text-white font-bold px-3 py-2 rounded m-2"
                    href="#">
                        Editar usuario
                    </a>
                    <button 
                    class="bg-red-500 text-white font-bold px-3 py-2 rounded m-2">
                        Eliminar usuario
                    </button>
                </div>
            </div>  
        </li>
    `);
}

// Fetch users
fetch("http://127.0.0.1:3000/users")
.then(res => {
    if(!res.ok) {
        console.log("ERROR");
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(user => {
        userListElement.innerHTML += userDetailsComponent(user)
    });
});