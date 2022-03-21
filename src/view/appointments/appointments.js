const citaComponent = (data) =>{
    return (`
        <li>
            <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5">
                <div class="flex flex-row items-center justify-start">
                    <input type="checkbox" class="m-2"> 
                    <div id="info-cita">
                        <label id="title" class="mx-3"> ${data.title}</label>
                        <label id="fecha" class="mx-3">${data.date}</label>
                        <label id="doc" class="mx-3">${data.especialist}</label>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-content-end">
                    <button 
                    value=${data.id}
                    onclick="updateAppointment(this)"
                    class="bg-blue-500 text-white font-bold px-3 py-2 rounded m-2"
                    >
                        Modificar
                    </button>
                    <button
                    class="bg-red-500 text-white font-bold px-3 py-2 rounded m-2" 
                    onclick="deleteAppointment()"
                    >
                        Eliminar
                    </button>
                </div>
            </li>
        </div>
    `);
};

//Cuando se tenga un token se podrá poner las citas del usuario logeado y se cambiara la url
const url="http://127.0.0.1:3000/appointments/usr/623397cd28a7957cb8221999";
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
        citas.innerHTML += citaComponent(appointment);
    });
});

function updateAppointment(data){
    localStorage.setItem("appointmentData", data.value);
    window.open("./updateAppointment.html", "_self");
}