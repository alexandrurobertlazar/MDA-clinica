const form = document.getElementById("form");

// Inputs
const appointmentType = document.getElementById("appointment-type");
const appointmentPatient = document.getElementById("patient-select");
const appointmentDate = document.getElementById("date-selector");
const appointmentHour = document.getElementById("hour-select");
const appointmentDescription = document.getElementById("description");

const user = localStorage.getItem("user_id");

const appointmentData = {
    title: "",
    patient: "",
    specialist: localStorage.getItem("user_id"),
    date: "",
    hour: "",
    desc: ""
}

const validationError = {
    title: false,
    patient: false,
    specialist: false,
    date: false,
    hour: false,
    desc: false
}

// function to load the available hours
function changeHourSelector() {
    let specialist_id = localStorage.getItem("user_id");
    let patient_id = appointmentPatient.value;
    let date = appointmentDate.value;
    var hours = [];
    fetch(`http://127.0.0.1:3000/appointments/${specialist_id}&${date}`).then(res=>{
        if(res.ok){
            return res.json();
        }
    })
    .then(data => hours = data)
    .then(() => {
        fetch(`http://127.0.0.1:3000/appointments/patient/${patient_id}&${date}`)
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {
            hours = hours.filter((h) => data.includes(h));
            console.log(hours);
            hours.forEach(hour => {
                appointmentHour.innerHTML += `<option value="${hour}"> ${hour} </option>`;
            })
        });
    });
}


// Fetch the list of patients
fetch("http://127.0.0.1:3000/users/role/patient").then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(patient => {
        appointmentPatient.innerHTML+=`<option value="${patient.id}"> ${patient.name} </option>`
    });
});

appointmentDate.addEventListener('change', (event) =>{
    const value = event.target.value;
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) <= Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else {
        validationError.date=false;
        appointmentData.date = value;
        document.getElementById("date-error").classList.add('hidden');
        changeHourSelector();
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
    } else {
        appointmentData.title = appointmentType.value;
        appointmentData.patient = appointmentPatient.value;
        appointmentData.date = appointmentDate.value;
        appointmentData.hour = appointmentHour.value;

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
                window.open("/src/view/appointments/specialist/appointments_specialist.html", "_self");
            }
        });
    }
});
