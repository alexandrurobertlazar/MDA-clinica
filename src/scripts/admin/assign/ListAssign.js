const patientListElement = document.getElementById("patient-list");
var i=1;

// Custom component for show each assign
const assignDetailsComponent = (assign) => {
    return (`
            <tr id=${assign.id_assign} class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        ${i++}
                </td> 
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${assign.patients}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${assign.specialist}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                        value=${assign.id_assign}
                        onclick=navigateToUpdateTreatment(this)
                        class="text-blue-500 underline md:no-underline md:bg-blue-500 md:text-white font-bold p-2">
                            Editar asignación
                    </button>
                    <button
                        value=${assign.id_assign}
                        onclick="deleteTreatment(this)"
                        class="text-red-500 underline md:no-underline md:bg-red-500 md:text-white font-bold p-2 rounded">
                            Eliminar asignación
                    </button>
                </td>
            </tr>
    `);
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








