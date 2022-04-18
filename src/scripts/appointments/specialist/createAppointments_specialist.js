const form = document.getElementById("app-form");

const user = localStorage.getItem("user_id");

const appointmentData = {
    title: "",
    pacient: "",
    especialist: "",
    date: "",
    desc: ""
}

const validationError = {
    title: false,
    pacient: false,
    especialist: false,
    date: false,
    desc: false
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let validation = true;
    Object.entries(validationError).forEach(error =>{
        const [, value] = error;
        if(value){
            validation = false;
        }
    });
    if(!validation){
        document.getElementById("submit-error").classList.remove("hidden");
    } else{
        
    }
});
