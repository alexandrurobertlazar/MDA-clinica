const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const passwordInputElement = document.getElementById("password");

// Load user id
const user_id = localStorage.getItem("id");
if(!user_id) {
    history.back();
}

fetch(`http://127.0.0.1:3000/users/${user_id}`)
.then(res => {
    if(!res.ok) {
        console.log("ERROR");
    } else {
        return res.json();
    }
})
.then(user => {
    nameInputElement.defaultValue = user.name;
    emailInputElement.defaultValue = user.email;
});

