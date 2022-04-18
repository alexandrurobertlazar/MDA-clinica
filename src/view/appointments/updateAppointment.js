const citaId = localStorage.getItem("appointmentData");
localStorage.removeItem("appointmentData");
const especialistSelector = document.getElementById("especialist-select");
const date = document.getElementById("date-selector");
const desc = document.getElementById("appointment-desc");
const form = document.getElementById("appointment-form");
let especialistOrigin = "";

const cita ={
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

let url="http://127.0.0.1:3000/appointments/";
url+=citaId.toString();

fetch(url).then(res=>{
    if(!res.ok){
        console.log("ERROR");
    } else{
        return res.json();
    }
})
.then(data =>{
    //Fecha
    let strDate = data.date.substring(0, data.date.length-1);
    date.setAttribute("value", strDate);

    //Descripción
    desc.value=data.desc;

    //Especialista original
    especialistOrigin = data.specialist;

    cita.title =data.title;
    cita.date = data.date;
    cita.desc = data.desc;
    cita.patient = data.patient;
    cita.specialist = data.specialist;
})

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
});

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let validation = true;
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


date.addEventListener('change', (event) =>{
    const value = event.target.value;
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) <= Date.parse(hoy.toISOString())){
        validationError.date = true;
        document.getElementById("date-error").classList.remove('hidden');
    } else{
        validationError.date = false;
        cita.date = value;
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
        cita.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});
