const historyListElement = document.getElementById("patient-history");
const id_patient = localStorage.getItem("user_id"); // Get id_patient select
const title = document.getElementById("patient-name");


// Fetch name patient (title)
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
});


// Custom component for show history of patient
const historyDetailsComponent = (history) => {
    
    return (`
    <tr class="text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${history.subject}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${history.description}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${history.name}
        </td>
    </tr>`);
}


// Fetch history by id_patient and name of sanitary
fetch(`http://127.0.0.1:3000/history/names/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(history => {
        historyListElement.innerHTML += historyDetailsComponent(history);
    });
});
 