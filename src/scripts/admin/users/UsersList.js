const userListComponent = document.getElementById("user-list");

// Custom component for show each user
const userDetailsComponent = (user) => {
    return (`
        <li>
            <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5">
                <div class="flex flex-col h-full">
                    <div>
                        <input type="checkbox" name="user1" id="user1" value=${user.id}>
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
        userListComponent.innerHTML += userDetailsComponent(user)
    });
});