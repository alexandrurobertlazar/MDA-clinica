const form = document.getElementById("form");

// Inputs
const appointmentType = document.getElementById("appointment-type");
const appointmentPatient = document.getElementById("patient-select");
const appointmentDate = document.getElementById("date-selector");
const appointmentDescription = document.getElementById("description");

const user = localStorage.getItem("user_id");

const appointmentData = {
    title: "",
    patient: "",
    specialist: "",
    date: "",
    desc: ""
}

const validationError = {
    title: false,
    patient: false,
    specialist: false,
    date: false,
    desc: false
}

const validationHelper = (text, max, min) => {
    if(text.length < min) {
        return `La longitud de este texto debe ser mayor de ${max} caracteres`;
    } else if(text.length > max) {
        return `La longitud de este texto debe ser menor de ${min} caracteres`;
    }
    return "";
}

appointmentPatient.addEventListener("change", (event) => {
    appointmentData.patient = event.target.value;
});

appointmentDate.addEventListener('change', (event) =>{
    const value = event.target.value;
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) <= Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else{
        validationError.date=false;
        appointmentData.date = value;
        document.getElementById("date-error").classList.add('hidden');
    }
});

appointmentDescription.addEventListener('change', (event) =>{
    const value = event.target.value;
    if(value.length<5){
        validationError.desc = true;
        document.getElementById("desc-error").classList.remove('hidden');
    } else{
        validationError.desc = false;
        appointmentData.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});

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
