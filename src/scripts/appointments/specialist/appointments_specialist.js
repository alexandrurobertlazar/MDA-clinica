const appointmentsContainer = document.getElementById("appointments-container")

// navigate to update appointment
function navigateToUpdate(button) {
    localStorage.setItem('appointment_id', button.value);
    window.open("/src/view/appointments/specialist/updateAppointment_specialist.html", "_self");
}

// Appointment component
const appointmentListComponent = (appointment, patient) => {
    appointment.date = new Date(appointment.date).toLocaleDateString("es");
    return (`
            <div class="p-2.5 m-2 w-11/12 md:w-3/4 max-w-2xl border rounded flex flex-wrap justify-center">
                <div class="flex flex-col w-1/2">
                    <h2 class="font-bold m-1">
                        ${appointment.title}
                    </h2>
                    <p class="font-light text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        ${appointment.desc}
                    </p>
                </div>
                <div class="flex flex-col items-end w-1/2">
                    <h3 class="m-1 font-light">
                        <strong>Paciente:</strong> ${patient}
                    </h3>
                    <h3 class="m-1 font-light">
                        Fecha: ${appointment.date}
                    </h3>
                </div>
                <div class="flex flex-col md:flex-row">
                    <button
                    value=${appointment.id}
                    onclick=navigateToUpdate(this)
                    class="text-blue-500 underline md:no-underline md:bg-blue-500 md:text-white font-bold px-3 py-2 rounded md:m-2">
                        Editar cita
                    </button>
                    <button
                    value=${appointment.id}
                    onclick="deleteUser(this)"
                    class="text-red-500 underline md:no-underline md:bg-red-500 md:text-white font-bold px-3 py-2 rounded md:m-2">
                        Eliminar cita
                    </button>
                </div>
            </div>
    `);
};


// Fetch appointments
let user_id = localStorage.getItem('user_id');
fetch(`http://127.0.0.1:3000/appointments/esp/${user_id}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.sort((a, b) => {
        var keyA = new Date(a.date);
        var keyB = new Date(b.date);
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });

    data.map(appointment => {
        fetch(`http://127.0.0.1:3000/users/${appointment.patient}`)
        .then(res => {
            if(!res.ok) {

            } else {
                return res.json();
            }
        }).then(patient => {
            appointmentsContainer.innerHTML += appointmentListComponent(appointment, patient.name);
        })
    });
});
