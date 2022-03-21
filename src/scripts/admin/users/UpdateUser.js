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

const validationErrorComponent = (error) => {
    return(`
        <h4 class="font-light text-red-600">${error}</h4>        
    `)
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
        if(error) {
            validation = false;
        }
    });
    if(!validation) {
        document.getElementById("submit-container").innerHTML += validationErrorComponent("Revise todos los campos");
    } else {
        console.log("validado");
    }
});

nameInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length <= 3) {
        validationError.name = true;
        document.getElementById("name-container").innerHTML += validationErrorComponent("El nombre es demasiado corto");
    } else {
        validationError.name = false;
        userData.name = value;
    }
});

emailInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value)) {
        validationError.email = true;
        document.getElementById("email-container").innerHTML += validationErrorComponent("El email no es válido");
    } else {
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
        document.getElementById("password-container").innerHTML += validationErrorComponent("La contraseña es demasiado corta");
    } else {
        validationError.password = false;
        userData.password = value;
    }
});

passwordConfirmationInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value !== userData.password) {
        validationError.confirmation = true;
        document.getElementById("password2-container").innerHTML += validationErrorComponent("Las contraseñas no coinciden");
    } else {
        validationError.confirmation = false
    }
})