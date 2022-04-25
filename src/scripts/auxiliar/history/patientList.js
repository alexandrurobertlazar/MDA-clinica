const patientListElement = document.getElementById("patient-list");
const historyListElement = document.getElementById("patient-history");

const title = document.getElementById("patient-name");
const subtitle = document.getElementById("subtitle");

const id_patient = localStorage.getItem("id"); // Get id_patient select
var i = 1;
 
var id_specialist = undefined;
var id_specialist_2 = undefined;

// Custom component for show each patient
const patientDetailsComponent = (patient) => {
    return (`
    <tr class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${patient.name}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${patient.email}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${patient.phone}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button
                value=${patient.id}
                onclick=navigateToHistory(this)
                class="text-slate-500 underline md:no-underline md:bg-slate-500 md:text-white font-bold p-2 rounded">
                    Ver historial
            </button>
        </td>
    </tr>`);
}


// Fetch Patients
fetch('http://127.0.0.1:3000/users/role/patient')
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(patients => {
        patientListElement.innerHTML += patientDetailsComponent(patients);
    });
});

// Navigate to history
function navigateToHistory(button) {
    localStorage.setItem('id', button.value);
    //localStorage.setItem('id_specialist_2', );
    window.open("/src/view/auxiliar/history/patientHistory.html", "_self");
}


/* For show history */

// Fetch name patient (title y subtitle)
fetch(`http://127.0.0.1:3000/users/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    title.innerHTML = `Paciente: ${data.name}`;
    subtitle.innerHTML = `En esta página podrá ver y administrar el historial del paciente ${data.name}`;
});

// Custom component for show history 
const historyDetailsComponent = (history) => {
    id_specialist = history.id_specialist;
    id_specialist_2 = history.id_specialist;
    localStorage.setItem('id_specialist_2', id_specialist_2);
    return (`
    <tr class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${i++}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${history.subject}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${history.description}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button
                value=${history._id}
                onclick=navigateToUpdateHistory(this)
                class="text-blue-500 underline md:no-underline md:bg-blue-500 md:text-white font-bold p-2 rounded">
                    Editar prueba clínica
            </button>
        </td>
    </tr>`);
}

// Navigate to update history
function navigateToUpdateHistory(button) {
    localStorage.setItem('id_history', button.value);
    localStorage.setItem('id_patient', id_patient);
    localStorage.setItem('id_specialist', id_specialist);
    window.open("/src/view/auxiliar/history/updateHistory.html", "_self");
}

// Fetch history of a patient
fetch(`http://127.0.0.1:3000/history/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(history => {
        console.log(history);
        historyListElement.innerHTML += historyDetailsComponent(history);
    });
});
 

