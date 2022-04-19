//Cuando se tenga un token se podrá poner las citas del usuario logeado y se cambiara la url
const user_id = localStorage.getItem("user_id");
const url =`http://127.0.0.1:3000/appointments/usr/${user_id}`
const citas = document.getElementById("citas");
const noCitas=document.getElementById("noCitas");

var markedAppointments =[];

function checkboxEvent(checkbox) {
    if(checkbox.checked) {
        markedAppointments.push(checkbox.value);
        
    } else { 
        markedAppointments = markedAppointments.filter(id => id !== checkbox.value);
    }
}

fetch(url).then(res=>{
    if(!res.ok){
    } else{
        return res.json();
    }
})
.then(data =>{
    if(data.length == 0){
        noCitas.innerHTML=`<h1 class="text-center text-xl font-bold">No tiene citas<h1>`
    } else{
        noCitas.innerHTML='';
        data.sort((a, b) => {
            //Dia
            var [day1, month1, year1] = a.date.split('-');
            var dayA = parseInt(day1)
            var monthA = parseInt(month1);
            var yearA = parseInt(year1);
            var [day2, month2, year2] = b.date.split('-');
            var dayB = parseInt(day2)
            var monthB = parseInt(month2);
            var yearB = parseInt(year2);

            //Hora
            var [hour1, min1] = a.hour.split(':');
            var hourA = parseInt(hour1);
            var minA = parseInt(min1);
            var [hour2, min2] = b.hour.split(':');
            var hourB = parseInt(hour2);
            var minB = parseInt(min2);

            if(yearA < yearB) return -1;
            if(yearA > yearB) return 1;
            if(yearA === yearB) {
                if(monthA < monthB) return -1;
                if(monthA > monthB) return 1;
                if(monthA === monthB) {
                    if(dayA < dayB) return -1;
                    if(dayA > dayB) return 1;
                    if(dayA === dayB) {
                        if(hourA < hourB) return -1;
                        if(hourA > hourB) return 1;
                        if(hourA === hourB){
                            if(minA < minB) return -1;
                            if(minA > minB) return 1;
                        }
                    }
                };
            };
            return 0;
        });

        data.forEach(appointment => {
            let title = appointment.title;
            let dateRaw = appointment.date;
            let [year, month, day] = dateRaw.split("-");
            let date = day+"-"+month+"-"+year;
            let hour = appointment.hour;
            let appointment_id = appointment.id;
            fetch(`http://127.0.0.1:3000/users/${appointment.specialist}`).then(res =>{
                if(res.ok){
                    return res.json();
                }
            }).then(data =>{
                citas.innerHTML += `
                <li id=${appointment_id}>
                    <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5">
                        <div class="flex flex-row items-center justify-start">
                            <input type="checkbox" value=${appointment_id} onchange="checkboxEvent(this)" class="m-2"> 
                            <div id="info-cita">
                                <label id="title" class="mx-3 font-bold"> ${title}</label>
                                <label id="hora" class="mx-2">${hour}</label>
                                <label id="fecha" class="mx-2">${date}</label>
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
    }
});

function updateAppointment(data){
    localStorage.setItem("appointmentData", data.value);
    window.open("./updateAppointment.html", "_self");
}

function createAppointment(){
    window.open("./createAppointment.html", "_self");
}

function deleteAppointment(app_id){
    fetch(`http://127.0.0.1:3000/appointments/${app_id.value}`,{
        method: 'DELETE'
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
    }).then(data =>{
        const oldElement = document.getElementById(app_id.value);
        oldElement.parentNode.removeChild(oldElement);
    });
}

function deleteSelectedAppointments(){
    markedAppointments.forEach(app =>{
        fetch(`http://127.0.0.1:3000/appointments/${app}`,{
            method: 'DELETE'
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
        }).then(data =>{
            const oldElement = document.getElementById(app);
            oldElement.parentNode.removeChild(oldElement);
        });
    });
}