const nameText = document.getElementById("name-text");
const emailText = document.getElementById("email-text");
const phoneText = document.getElementById("phone-text");
const roleText = document.getElementById("role-text");

const user_id = localStorage.getItem('id');
if(!user_id) {
    history.back();
}

/**
 * FETCH USER DATA
 */
fetch(`http://127.0.0.1:3000/users/${user_id}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(user => {
    nameText.innerText = user.name;
    emailText.innerText = user.email;
    phoneText.innerText = user.phone;
    roleText.innerText = user.role;
});

function navigateToUpdate() {
    localStorage.setItem('id', user_id);
    window.open("/src/view/admin/users/UpdateUser.html", "_self");
}

// delete user
async function deleteUser(button) {
    await fetch(`http://127.0.0.1:3000/users/${user_id}`, {
        method: "DELETE"
    })
    .then(res => {
        if(!res.ok) {
            // Mostrar error al usuario
        } else {
            return res.json();
        }
    })
    .then(data => {
        if(data.removed) {
            window.open("/src/view/admin/users/UsersList.html", "_self");
        }
    });
}
