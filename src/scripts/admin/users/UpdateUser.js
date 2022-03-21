const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const roleInputElement = document.getElementById("role");
const passwordInputElement = document.getElementById("password");
const passwordConfirmationInputElement = document.getElementById("password-confirmation");
const userFormElement = document.getElementById("user-form");

// New user data
const userData = {
    name: "",
    email: "",
    role: "",
    password: ""
};

// Validation error
const validationError = {
    name: false,
    email: false,
    role: false,
    password: false,
    confirmation: false
}

// Load user id from localStorage
const user_id = localStorage.getItem("id");
if(!user_id) {
    history.back();
}

// Fetch old data
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
    roleInputElement.value = user.role;
});

// Event listener
userFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    var validation = true;
    Object.entries(validationError).forEach(error => {
        const [, value] = error;
        if(value) {
            validation = false;
        }
    });
    if(!validation) {
        document.getElementById("submit-container").innerHTML += validationErrorComponent("Revise todos los campos");
    } else {
        document.getElementById("success-container").classList.add('flex');
        document.getElementById("success-container").classList.remove('hidden');
        userFormElement.classList.add('hidden');
        userFormElement.classList.remove('flex');
    }
});

nameInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length <= 3) {
        validationError.name = true;
        document.getElementById("name-error").classList.remove('hidden');
    } else {
        document.getElementById("name-error").classList.add('hidden');
        validationError.name = false;
        userData.name = value;
    }
});

emailInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value)) {
        validationError.email = true;
        document.getElementById("email-error").classList.remove('hidden');
    } else {
        document.getElementById("email-error").classList.add('hidden');
        validationError.email = false;
        userData.email = value;
    }
});

roleInputElement.addEventListener('change', (event) => {
    console.log(event.target.value);
});

passwordInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length <= 5) {
        validationError.password = true;
        document.getElementById("email-error").classList.remove('hidden');
    } else {
        document.getElementById("email-error").classList.add('hidden');
        validationError.password = false;
        userData.password = value;
    }
});

passwordConfirmationInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value !== userData.password) {
        validationError.confirmation = true;
        document.getElementById("password2-container").classList.remove('hidden');
    } else {
        document.getElementById("password2-container").classList.add('hidden');
        validationError.confirmation = false
    }
})