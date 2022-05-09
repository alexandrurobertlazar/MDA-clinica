const id_specialist = localStorage.getItem("id_specialist_specific");
const card = document.getElementById("card");
const title = document.getElementById("title");
const button = document.getElementById("button");

// Custom component for show each patient
const specificAssignDetailsComponent = (patient) => {
    return (`
        <ul class="list-disc flex items-center justify-center flex-col mt-5 mb-5">
            <li class="uppercase underline">
                ${patient.name}
            </li>
        </ul>
        <table class="mb-5 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Teléfono
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4">
                        ${patient.phone}
                    </td>
                    <td class="px-6 py-4">
                        ${patient.email}
                    </td>
                </tr>
            </tbody>
        </table>
    `);
}

const buttonComponent = () => {
    return (`
        <div class="flex items-center justify-center">
            <a href="./ListAssign.html" class="m-auto inline-flex items-center bg-blue-500 text-white font-bold px-3 py-2 rounded m-2 text-sm font-medium text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Volver a la tabla
                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
    `);
}

// Fetch specialists names
fetch(`http://127.0.0.1:3000/users/${id_specialist}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    title.innerHTML += `Listado de pacientes del/la especialista ${data.name}`;
});

// Fetch Patients of an specialist
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
        card.innerHTML += specificAssignDetailsComponent(patients);
    });
    button.innerHTML += buttonComponent();
});

