//Cuando se tenga un token se podrá poner las citas del usuario logeado y se cambiara la url
const url="http://127.0.0.1:3000/appointments/usr/62398dfff2ef62b05643d01d";
const citas = document.getElementById("citas");
fetch(url).then(res=>{
    if(!res.ok){
        console.log("ERROR");
    } else{
        return res.json();
    }
})
.then(data =>{
    data.forEach(appointment => {
        let title = appointment.title;
        let dateRaw = appointment.date.substring(0, appointment.date.length-8);
        let dateSplitted = dateRaw.split("T");
        let date = dateSplitted[0] + "  " + dateSplitted[1];
        let appointment_id = appointment.id;
        fetch(`http://127.0.0.1:3000/users/${appointment.especialist}`).then(res =>{
            if(res.ok){
                return res.json();
            }
        }).then(data =>{
            citas.innerHTML += `
            <li id=${appointment_id}>
                <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5">
                    <div class="flex flex-row items-center justify-start">
                        <input type="checkbox" class="m-2"> 
                        <div id="info-cita">
                            <label id="title" class="mx-3 font-bold"> ${title}</label>
                            <label id="fecha" class="mx-3">${date}</label>
                            <label id="docLabel" class="mx-3 font-bold">Especialista: </label>
                            <label id="doc" class="mx-3">  ${data.name} </label>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-content-end">
                        <button 
                        value=${appointment_id}
                        onclick="updateAppointment(this)"
                        class="bg-blue-500 text-white font-bold px-3 py-2 rounded m-2"
                        >
                            Modificar
                        </button>
                        <button
                        value=${appointment_id}
                        class="bg-red-500 text-white font-bold px-3 py-2 rounded m-2" 
                        onclick="deleteAppointment(this)"
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
            </div>
            `;
        });
    });
});

function updateAppointment(data){
    localStorage.setItem("appointmentData", data.value);
    window.open("./updateAppointment.html", "_self");
}

function deleteAppointment(app_id){
    console.log(app_id.value);
    fetch(`http://127.0.0.1:3000/appointments/${app_id.value}`,{
        method: 'DELETE'
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
    }).then(data =>{
        console.log(data);
        const oldElement = document.getElementById(app_id.value);
        oldElement.parentNode.removeChild(oldElement);
    });
}