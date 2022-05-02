const nameText = document.getElementById("name-text");
const emailText = document.getElementById("email-text");
const phoneText = document.getElementById("phone-text");
const roleText = document.getElementById("role-text");

const user_id = localStorage.getItem('user_id');

fetch(`http://127.0.0.1:3000/users/${user_id}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(user => {
    console.log(nameText);
    nameText.innerHTML = user.name;
    emailText.innerHTML = user.email;
    phoneText.innerHTML = user.phone;
    roleText.innerHTML = user.role;
});