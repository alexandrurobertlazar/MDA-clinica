const form = document.getElementById("app-form");
const type = document.getElementById("type");
const specialistSelect = document.getElementById("especialist-select");
const date = document.getElementById("date-selector");
const desc = document.getElementById("appointment-desc");
const patient = localStorage.getItem("user_id");

const appointmentData = {
    title: "",
    patient: "",
    specialist: "",
    date: "",
    desc: ""
}

const validationError ={
    title: false,
    patient: false,
    specialist: false,
    date: false,
    desc: false
}


fetch("http://127.0.0.1:3000/users/role/specialist").then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(specialist => {
        specialistSelect.innerHTML+=`<option value="${specialist.id}"> ${specialist.name} </option>`
    });
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
        appointmentData.title = type.value;
        appointmentData.patient = patient;
        appointmentData.specialist = specialistSelect.value;
        fetch(`http://127.0.0.1:3000/appointments`,{
            method: 'POST',
            body: JSON.stringify(appointmentData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(!res.ok){
                return "ERROR";
            } else{
                document.getElementById("submit-error").classList.add("hidden");
                form.classList.add('hidden');
                window.open("./appointments.html", "_self");
            }
        });
    }
});

date.addEventListener('change', (event) =>{
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

desc.addEventListener('change', (event) =>{
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
