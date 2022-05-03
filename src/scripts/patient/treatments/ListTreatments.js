const patientListElement = document.getElementById("patient-list");
const treatmentListElement = document.getElementById("patient-treatment");
const title = document.getElementById("patient-name");
const subTitle = document.getElementById("subtitle");
const id_patient = localStorage.getItem("user_id");
var i=1;
// Custom component for show each treatment
const treatmentDetailsComponent = (treatment) => {
    return (`
            <tr id=${treatment._id} class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${treatment.subject}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${treatment.description}
                </td>
            </tr>
    `);
}

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
    subtitle.innerHTML = `En esta página podrá ver sus tratamientos`;
});

treatmentList = []

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
        treatmentList.push(treatments)
    });
});



function getPdfTreatments() {
    if (treatmentList.length > 0) {
        localStorage.setItem('treatmentList', JSON.stringify(treatmentList));
        window.open("/src/pdf/treatments.html", '_blank');
    } else {
        alert("Error: No tiene tratamientos.")
    }    
}