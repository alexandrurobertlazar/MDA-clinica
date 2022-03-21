const nameText = document.getElementById("name-text");
const emailText = document.getElementById("email-text");
const phoneText = document.getElementById("phone-text");
const roleText = document.getElementById("role-text");

const user_id = localStorage.getItem('id');
if(!user_id) {
    history.back();
} else {
    localStorage.removeItem('id');
}

/**
 * FETCH USER DATA
 */
fetch(`http://127.0.0.1:3000/users/${user_id}`)
.then(res => {
    if(!res.ok) {
        console.log("ERROR");
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
    window.location.href = 'http://127.0.0.1:5500/src/view/admin/users/UpdateUser.html';
}

// delete user
async function deleteUser(button) {
    await fetch(`http://127.0.0.1:3000/users/${user_id}`, {
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
            window.location.href = 'http://127.0.0.1:5500/src/view/admin/users/UsersList.html';
        }
    });
}
