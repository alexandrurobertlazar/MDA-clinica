const nameInputElement = document.getElementById("name-contact");
const emailImputElement = document.getElementById("email-contact");
const messageTextAreaElement = document.getElementById("message-contact");

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
    if(value.length < 5 || value.length > 20){
        validationError.name_contact = true;
        document.getElementById("name-contact-error").classList.remove('hidden');
    } else {
        document.getElementById("name-contact-error").classList.add('hidden');
        validationError.name_contact = false;
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
    }
});



function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

messageTextAreaElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 10 || value.length > 100) {
        validationError.message_contact = true;
        document.getElementById("message-contact-error").classList.remove('hidden');
    } else {
        document.getElementById("message-contact-error").classList.add('hidden');
        validationError.message_contact = false;
    }
});