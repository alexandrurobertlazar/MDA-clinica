const citaId = localStorage.getItem("appointmentData");
localStorage.removeItem("appointmentData");
const especialistSelector = document.getElementById("especialist-select");
const desc = document.getElementById("appointment-desc");
const form = document.getElementById("appointment-form");
const dateSelector = document.getElementById("selectDate");
const hourSelector = document.getElementById("selectHour");

const oldData = {
    title: "",
    patient: "",
    specialist: "",
    date: "",
    hour: "",
    desc: ""
}

let especialistOrigin = "";

const cita ={
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

let url="http://127.0.0.1:3000/appointments/";
url+=citaId.toString();


fetch("http://127.0.0.1:3000/users/role/specialist").then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(especialist => {
        if(especialist.id === especialistOrigin){
            especialistSelector.innerHTML+= `<option selected value="${especialist.id}"> ${especialist.name} </option>`
        } else{
            especialistSelector.innerHTML+=`<option value="${especialist.id}"> ${especialist.name} </option>`
        }
    });
}).then(()=>{
    fetch(url).then(res=>{
        if(!res.ok){
            console.log("ERROR");
        } else{
            return res.json();
        }
    }).then(data =>{
        oldData.title = data.title;
        oldData.patient = data.patient;
        oldData.specialist = data.specialist;
        oldData.date = data.date;
        oldData.hour = data.hour;
        oldData.desc = data.desc;
        
        //Fecha
        dateSelector.setAttribute("value", data.date);
        
        changeHourSelector(undefined);
        hourSelector.innerHTML+=`<option selected value="${data.hour}"> ${data.hour} </option>`;

        //Descripción
        desc.value=data.desc;
    
        //Especialista original
        especialistOrigin = data.specialist;
    
        cita.title =data.title;
        cita.date = data.date;
        cita.hour = data.hour;
        cita.desc = data.desc;
        cita.patient = data.patient;
        cita.specialist = data.specialist;
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
        fetch(`http://127.0.0.1:3000/appointments/${citaId}`, {
            method: 'PUT',
            body: JSON.stringify(cita),
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
                window.open("./appointments.html", "_self");
            }
        });
    } 
});

hourSelector.addEventListener('change', (event)=>{cita.hour = event.target.value;});

dateSelector.addEventListener('change', (event)=>{
    changeHourSelector(event);
    cita.date = event.target.value;
});

especialistSelector.addEventListener('change', (event)=>{
    changeHourSelector(event);
    cita.specialist = event.target.value;
});

function changeHourSelector(event){
    let specialist_id=especialistSelector.value;
    let date = dateSelector.value;
    fetch(`http://127.0.0.1:3000/appointments/${specialist_id}&${date}`).then(res=>{
        if(res.ok){
            return res.json();
        }
    }).then(data=>{
        hourSelector.innerHTML='';
        if(especialistOrigin === specialist_id){
            hourSelector.innerHTML+=`<option selected value="${oldData.hour}"> ${oldData.hour} </option>`;
        }
        data.forEach(hour => {
            hourSelector.innerHTML+=`<option value="${hour}"> ${hour} </option>`;
        });
    })
}



desc.addEventListener('change', (event) =>{
    const value = event.target.value;
    if(value.length<5){
        validationError.desc = true;
        document.getElementById("desc-error").classList.remove('hidden');
    } else{
        validationError.desc = false;
        cita.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});


