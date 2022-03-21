const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const phoneInputElement = document.getElementById("phone");
const roleInputElement = document.getElementById("role");
const passwordInputElement = document.getElementById("password");
const passwordConfirmationInputElement = document.getElementById("password-confirmation");
const userFormElement = document.getElementById("user-form");

// New user data
const userData = {
    name: "",
    email: "",
    phone: "",
    role: "",
    password: ""
};

// Validation error
const validationError = {
    name: false,
    email: false,
    phone: false,
    role: false,
    password: false,
    confirmation: false
}


/**
 * SUBMIT
 */
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
        document.getElementById("submit-error").classList.remove("hidden");
    } else {
        fetch(`http://127.0.0.1:3000/users`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                console.log("ERROR");
            } else {
                document.getElementById("submit-error").classList.add("hidden");
                document.getElementById("success-container").classList.add('flex');
                document.getElementById("success-container").classList.remove('hidden');
                userFormElement.classList.add('hidden');
                userFormElement.classList.remove('flex');
            }
        });
    }
});

/**
 * INPUTS VALIDATIONS
 */
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

phoneInputElement.addEventListener('change', event => {
    const value = event.target.value;
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!re.test(value)) {
        validationError.phone = true;
        document.getElementById("phone-error").classList.remove('hidden');
    } else {
        document.getElementById("phone-error").classList.add('hidden');
        validationError.phone = false;
        userData.phone = value;
    }
});

roleInputElement.addEventListener('change', (event) => {
    userData.role = event.target.value;
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
        document.getElementById("password2-error").classList.remove('hidden');
    } else {
        document.getElementById("password2-error").classList.add('hidden');
        validationError.confirmation = false
    }
});