const patientListElement = document.getElementById("patient-list");
const treatmentListElement = document.getElementById("patient-treatment");
const title = document.getElementById("patient-name");
const subTitle = document.getElementById("subtitle");
const id_specialist = localStorage.getItem("user_id");
const id_patient = localStorage.getItem("id");
var i=1;

const deleteMarkedTreatmentsButton = document.getElementById("delete-marked-treatments-button");

// List of marked treatments id
var markedTreatments = []

// checkbox action
function checkboxEvent(checkbox) {
    if(checkbox.checked) {
        markedTreatments.push(checkbox.value);
    } else { 
        markedTreatments = markedTreatments.filter(id => id !== checkbox.value);
    }
}

// Custom component for show each patient
const patientDetailsComponent = (patient) => {
    return (`
            <tr class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${patient.name}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${patient.email}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${patient.phone}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                        value=${patient.id}
                        onclick=navigateToTreatments(this)
                        class="text-slate-500 underline md:no-underline md:bg-slate-500 md:text-white font-bold p-2 rounded">
                        Ver tratamientos
                    </button>
                </td>
            </tr>
    `);
}

// Custom component for show each treatment
const treatmentDetailsComponent = (treatment) => {
    return (`
            <tr id=${treatment._id} class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div class="sm:m-0 md:m-2">
                    <input type="checkbox" name=${treatment.subject} value=${treatment._id} onchange="checkboxEvent(this)">
                    <label class="font-bold text-lg"
                        for=${treatment.description}>
                            &nbsp;${i++}
                    </label>
                </div>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${treatment.subject}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${treatment.description}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                        value=${treatment._id}
                        onclick=navigateToUpdateTreatment(this)
                        class="text-blue-500 underline md:no-underline md:bg-blue-500 md:text-white font-bold p-2">
                            Editar tratamiento
                    </button>
                    <button
                        value=${treatment._id}
                        onclick="deleteTreatment(this)"
                        class="text-red-500 underline md:no-underline md:bg-red-500 md:text-white font-bold p-2 rounded">
                            Eliminar tratamiento
                    </button>
                </td>
            </tr>
    `);
}

// Fetch Patients
fetch(`http://127.0.0.1:3000/patientSpecialist/myPatients/${id_specialist}`)
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

//Fetch Title and subtitle of listTr
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
    subtitle.innerHTML = `En esta página podrá ver y administrar los tratamientos del paciente ${data.name}`;
});


// Fetch Treatments
fetch(`http://127.0.0.1:3000/treatments/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(treatments => {
        treatmentListElement.innerHTML += treatmentDetailsComponent(treatments);
    });
});


// delete only ONE treatment
async function deleteTreatment(button) {
    await fetch(`http://127.0.0.1:3000/treatments/${button.value}`, {
        method: "DELETE"
    })
    .then(res => {
        if(!res.ok) {
            // Mostrar error al usuario
        } else {
            return res.json();
        }
    })
    .then(data => {

        if(data.removed) {
            const oldTreatmentElement = document.getElementById(button.value);
            oldTreatmentElement.parentNode.removeChild(oldTreatmentElement);
            location.reload();
        } else {
            // Mostrar error al usuario
        }
    });
}

// navigate to patient treatment
function navigateToTreatments(button) {
    localStorage.setItem('id', button.value);
    window.location.href = 'http://127.0.0.1:5500/src/view/specialist/treatments/ListTreatments.html';
}

// navigate to update treatment
function navigateToUpdateTreatment(button) {
    localStorage.setItem('id_treatment', button.value);
    localStorage.setItem('id_patient',id_patient);
    window.location.href = 'http://127.0.0.1:5500/src/view/specialist/treatments/UpdateTreatment.html';
}

// Event listeners
deleteMarkedTreatmentsButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(markedTreatments.length > 0) {
        markedTreatments.forEach(async (id) => {
            await fetch(`http://127.0.0.1:3000/treatments/${id}`, {
                method: "DELETE"
            })
            .then(res => {
                if(!res.ok) {
                    // Mostrar error al usuario
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if(data.removed) {
                    const oldTreatmentElement = document.getElementById(id);
                    oldTreatmentElement.parentNode.removeChild(oldTreatmentElement);
                    location.reload();
                } else {
                    // Mostrar error al usuario
                }
            });
        });
    }
});