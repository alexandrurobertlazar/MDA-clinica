const form = document.getElementById("prueba-form");
const patientsSelect = document.getElementById("patients-select");
const desc = document.getElementById("appointment-desc");
const specialist = localStorage.getItem("user_id");

const dateSelector = document.getElementById("selectDate");

const analyticData = {
    patient: "",
    specialist: "",
    date: "",
    desc: ""
}

const validationError ={
    patient: false,
    specialist: false,
    date: false,
    desc: false
}

fetch(`http://127.0.0.1:3000/patientSpecialist/myPatients/${specialist}`).then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(patient => {
        patientsSelect.innerHTML+=`<option value="${patient.id}"> ${patient.name} </option>`
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
        analyticData.patient = patientsSelect.value;
        analyticData.specialist = specialist;
        analyticData.date = dateSelector.value;
        fetch(`http://127.0.0.1:3000/analytics`,{
            method: 'POST',
            body: JSON.stringify(analyticData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(!res.ok){
                return "ERROR";
            } else{
                document.getElementById("submit-error").classList.add("hidden");
                form.classList.add('hidden');
                window.open("/src/view/specialist/analytics/listAnalytics.html", "_self");
            }
        });
    }
});

desc.addEventListener('change', (event) =>{
    const value = event.target.value;
    if(value.length<5){
        validationError.desc = true;
        document.getElementById("desc-error").classList.remove('hidden');
    } else{
        validationError.desc = false;
        analyticData.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});

dateSelector.addEventListener('change', (event)=> {
    const value = event.target.value;
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) > Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else{
        validationError.date=false;
        analyticData.date = value;
        document.getElementById("date-error").classList.add('hidden');
    }
});
