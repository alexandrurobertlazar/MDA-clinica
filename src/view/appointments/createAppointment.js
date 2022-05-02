const form = document.getElementById("app-form");
const type = document.getElementById("type");
const especialistSelect = document.getElementById("especialist-select");
const desc = document.getElementById("appointment-desc");
const patient = localStorage.getItem("user_id");

const dateSelector = document.getElementById("selectDate");
const hourSelector = document.getElementById("selectHour");

const appointmentData = {
    title: "",
    patient: "",
    specialist: "",
    date: "",
    hour: "",
    desc: ""
}

const validationError ={
    title: false,
    patient: false,
    specialist: false,
    date: false,
    hour: false,
    desc: false
}


fetch("http://127.0.0.1:3000/users/role/specialist").then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(especialist => {
        patientsSelect.innerHTML+=`<option value="${especialist.id}"> ${especialist.name} </option>`
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
        analyticData.title = type.value;
        analyticData.patient = patient;
        analyticData.specialist = patientsSelect.value;
        analyticData.date = dateSelector.value;
        analyticData.hour = hourSelector.value;
        fetch(`http://127.0.0.1:3000/appointments`,{
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
                window.open("./appointments.html", "_self");
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
    if(Date.parse(value) <= Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else{
        validationError.date=false;
        analyticData.date = value;
        document.getElementById("date-error").classList.add('hidden');
        changeHourSelector(event)
    }
});
    
patientsSelect.addEventListener('change', (event)=>changeHourSelector(event));

function changeHourSelector(event){
    let specialist_id=patientsSelect.value;
    let date = dateSelector.value;
    console.log(date);
    fetch(`http://127.0.0.1:3000/appointments/${specialist_id}&${date}`).then(res=>{
        if(res.ok){
            return res.json();
        }
    }).then(data=>{
        hourSelector.innerHTML='';
        data.forEach(hour => {
            hourSelector.innerHTML+=`<option value="${hour}"> ${hour} </option>`;
        });
    })
}
