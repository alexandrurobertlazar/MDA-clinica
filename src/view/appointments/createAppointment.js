const form = document.getElementById("app-form");
const type = document.getElementById("type");
const especialistSelect = document.getElementById("especialist-select");
const date = document.getElementById("date-selector");
const desc = document.getElementById("appointment-desc");

const appointmentData = {
    title: "",
    pacient: "",
    especialist: "",
    date: "",
    desc: ""
}

const validationError ={
    title: false,
    pacient: false,
    especialist: false,
    date: false,
    desc: false
}


fetch("http://127.0.0.1:3000/users/role/especialista").then(res =>{
    if(res.ok){
        return res.json();
    }
}).then(data =>{
    data.forEach(especialist => {
        especialistSelect.innerHTML+=`<option value="${especialist.id}"> ${especialist.name} </option>`
    });
});

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(type.value);
    console.log(especialistSelect.value);
    console.log(date.value);
    console.log(desc.value);

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
        appointmentData.pacient = "62398dfff2ef62b05643d01d";
        appointmentData.especialist = especialistSelect.value;
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
            }
        });
    }
});

date.addEventListener('change', (event) =>{
    const value = event.target.value;
    console.log(value);
    let dateNow = Date.now();
    let hoy = new Date(dateNow);
    if(Date.parse(value) <= Date.parse(hoy.toISOString())){
        console.log("Vacio");
        validationError.date = true;
        document.getElementById("title-error").classList.remove('hidden');
    } else{
        validationError.date=false;
        appointmentData.date = value;
        document.getElementById("title-error").classList.add('hidden');
    }
});

desc.addEventListener('change', (event) =>{
    const value = event.target.value;
    console.log(value);
    if(value.length<5){
        validationError.desc = true;
        document.getElementById("desc-error").classList.remove('hidden');
    } else{
        validationError.desc = false;
        appointmentData.desc = value;
        document.getElementById("desc-error").classList.add('hidden');
    }
});
