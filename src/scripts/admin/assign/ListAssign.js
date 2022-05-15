const patientListElement = document.getElementById("patient-list");
var i=1;

const deleteMarkedAssignsButton = document.getElementById("delete-marked-assigns-button");

// List of marked treatments id
var markedAssign = []

// checkbox action
function checkboxEvent(checkbox) {
    if(checkbox.checked) {
        markedAssign.push(checkbox.value);
    } else { 
        markedAssign = markedAssign.filter(id => id !== checkbox.value);
    }
}

// Custom component for show each assign
const assignDetailsComponent = (assign) => {
    return (`
            <tr id=${assign.id_assign} class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div class="sm:m-0 md:m-2">
                    <input type="checkbox" name=${assign.patient} value=${assign.id_assign} onchange="checkboxEvent(this)">
                    <label class="font-bold text-lg"
                        for=${assign.patient}>
                            &nbsp;${i++}
                    </label>
                </div>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                        value=${assign.id_specialist} 
                        onclick=navigateToSpecificAssign(this)
                        class="underline text-blue-500">
                        ${assign.specialist}
                    </button>
                    
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${assign.patients}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                        value=${assign.id_assign}
                        onclick=navigateToUpdateAssign(this)
                        class="text-blue-500 underline md:no-underline md:bg-blue-500 md:text-white font-bold p-2">
                            Editar asignación
                    </button>
                    <button
                        id=${assign.id_assign}
                        value=${assign.id_assign}
                        onclick="deleteAssign(this)"
                        class="text-red-500 underline md:no-underline md:bg-red-500 md:text-white font-bold p-2 rounded">
                            Eliminar asignación
                    </button>
                </td>
            </tr>
    `);
}

// navigate to update assign
function navigateToUpdateAssign(button) {
    localStorage.setItem('id_assign', button.value);
    window.open("/src/view/admin/assign/UpdateAssign.html", "_self");
}

// navigate to list of specific assigns
function navigateToSpecificAssign(id_specialist) {
    localStorage.setItem('id_specialist_specific', id_specialist.value);
    window.open("/src/view/admin/assign/ListSpecificAssign.html", "_self");
}

// Fetch Patients and Specialist names
fetch(`http://127.0.0.1:3000/patientSpecialist/names`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(assign => {
        patientListElement.innerHTML+=assignDetailsComponent(assign);
    });
});

// delete only ONE assign
async function deleteAssign(button) {
    await fetch(`http://127.0.0.1:3000/patientSpecialist/${button.value}`, {
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
            const oldAssignElement = document.getElementById(button.value);
            oldAssignElement.parentNode.removeChild(oldAssignElement);
            location.reload();
        } else {
            // Mostrar error al usuario
        }
    });
}

// Event listeners to delete many assigns
deleteMarkedAssignsButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(markedAssign.length > 0) {
        markedAssign.forEach(async (id) => {
            await fetch(`http://127.0.0.1:3000/patientSpecialist/${id}`, {
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
                    const oldAssignElement = document.getElementById(id);
                    oldAssignElement.parentNode.removeChild(oldAssignElement);
                    location.reload();
                } else {
                    // Mostrar error al usuario
                }
            });
        });
    }
});








