const analyticId = localStorage.getItem("analyticData");
localStorage.removeItem("analyticData");
const patientsSelector = document.getElementById("patients-select");
const desc = document.getElementById("analytic-desc");
const form = document.getElementById("analytic-form");
const dateSelector = document.getElementById("selectDate");
const specialist = localStorage.getItem("user_id");

const oldData = {
    patient: "",
    specialist: "",
    date: "",
    desc: ""
}

let patientOrigin = "";

const analytic ={
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

let url="http://127.0.0.1:3000/analytics/";
url+=analyticId.toString();


fetch(`http://127.0.0.1:3000/patientSpecialist/myPatients/${specialist}`).then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(patient => {
        if(patient.id === patientOrigin){
            patientsSelector.innerHTML+= `<option selected value="${patient.id}"> ${patient.name} </option>`
        } else{
            patientsSelector.innerHTML+=`<option value="${patient.id}"> ${patient.name} </option>`
        }
    });
}).then(()=>{
    fetch(url).then(res=>{
        if(!res.ok){
        } else{
            return res.json();
        }
    }).then(data =>{
        oldData.patient = data.patient;
        oldData.specialist = data.specialist;
        oldData.date = data.date;
        oldData.desc = data.desc;
        
        //Fecha
        dateSelector.setAttribute("value", data.date);

        //Descripción
        desc.value=data.desc;
    
        //Especialista original
        patientOrigin = data.patient;
    
        analytic.date = data.date;
        analytic.desc = data.desc;
        analytic.patient = data.patient;
        analytic.specialist = data.specialist;
    })
})

form.addEventListener('submit', (event) =>{
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
        fetch(`http://127.0.0.1:3000/analytics/${analyticId}`, {
            method: 'PUT',
            body: JSON.stringify(analytic),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                // Mostrar error al usuario
            } else {
                document.getElementById("submit-error").classList.add("hidden");
                form.classList.add('hidden');
                window.open("/src/view/specialist/analytics/listAnalytics.html", "_self");
            }
        });
    } 
});

dateSelector.addEventListener('change', (event)=>{
    const value = event.target.value;
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) > Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else{
        validationError.date=false;
        analytic.date = value;
        document.getElementById("date-error").classList.add('hidden');
    }
});

patientsSelector.addEventListener('change', (event)=>{
    analytic.patient = event.target.value;
});

desc.addEventListener('change', (event) =>{
    const value = event.target.value;
    if(value.length<5){
        validationError.desc = true;
        document.getElementById("desc-error").classList.remove('hidden');
    } else{
        validationError.desc = false;
        analytic.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});


