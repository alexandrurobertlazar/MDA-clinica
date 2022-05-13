const nameInputElement = document.getElementById("name-contact");
const emailImputElement = document.getElementById("email-contact");
const messageTextAreaElement = document.getElementById("message-contact");
var n=0;

var namec;
var email;
var message;

const validationError = {
    name_contact: false,
    email_contact: false,
    message_contact: false
}

/**
 * INPUTS VALIDATIONS
 */
nameInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 5 || value.length > 50){
        validationError.name_contact = true;
        document.getElementById("name-contact-error").classList.remove('hidden');
    } else {
        document.getElementById("name-contact-error").classList.add('hidden');
        validationError.name_contact = false;
        namec=false;
    }
});

emailImputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(!isEmail(value)){
        validationError.email_contact = true;
        document.getElementById("email-contact-error").classList.remove('hidden');
    } else {
        document.getElementById("email-contact-error").classList.add('hidden');
        validationError.email_contact = false;
        email=false;
    }
});

messageTextAreaElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 10 || value.length > 100) {
        validationError.message_contact = true;
        document.getElementById("message-contact-error").classList.remove('hidden');
    } else {
        document.getElementById("message-contact-error").classList.add('hidden');
        validationError.message_contact = false;
        message=false;
    }
});

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validation (){

    if(nameInputElement.value != null && emailImputElement.value != null 
        && messageTextAreaElement.value != null){
        if (namec == false && email == false && message == false){
            return true;
        }
        alert("Tiene que rellenar todos los campos");
        return false;
    }
}
