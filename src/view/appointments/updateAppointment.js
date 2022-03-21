const citaId = localStorage.getItem("appointmentData");
localStorage.removeItem("appointmentData");
console.log(citaId);
//Hacer una llamada a la tabla de usuarios para que devuelva todos los especialistas 
//y ponerlos como opciones en el select
const especialist = document.getElementById("especialist-select");
const date=document.getElementById("date-selector");
const desc = document.getElementById("appointment-desc");
const form = document.getElementById("form");

const cita={
    title: "",
    especialist: "",
    date: "",
    desc: ""
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
    //Especialistas select

    //Fecha
    let strDate = data.date.substring(0, data.date.length-1);
    date.setAttribute("value", strDate);

    //Descripción
    console.log(data.desc);
    desc.value=data.desc;
});

form.addEventListener('submit', (event) =>{
    console.log("hola");;
});