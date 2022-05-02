const specialistsListElement = document.getElementById('specialists-lists')
const requestsListElement = document.getElementById('requests-lists')

function navigateToDetails() {
    console.log("detalles");
}

const user_id = window.localStorage.getItem('user_id')
if(!user_id) {
    window.open('/src/view/index.html', '_self');
}

const specialistComponent = (specialist) => {
    return `
        <div class="flex flex-col items-center border rounded shadow w-1/4">
            <i class="fa-solid fa-user-doctor text-5xl m-2"></i>
            <h4 class="font-light m-2">${specialist.name}</h4>
            <button
            onclick=navigateToRequestChange(this)
            value=${specialist.id}
            class="text-blue-700 font-bold flex items-center justify-center w-full"
            >
                <h6 class="m-2">Editar</h6>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
    `
}

const requestComponent = (request) => {
    return `
        <div class="flex flex-wrap items-center content-between justify-evenly rounded border shadow m-2 w-3/4">
            <div class="flex flex-col p-2">
                <h3 class="font-bold">Especialista</h3>
                <h5 class="font-light">${request.specialist.name}</h5>
            </div>
            <div class="flex justify-end p-2">
                <p class="font-light">${request.reason}</p>
            </div>
            <div class="flex flex-col p-2">
                <button
                class="p-2 text-blue-700"
                value=${request.id}
                onclick=navigateToDetails(this)>
                    <div class="flex items-center hover:shadow hover:rounded duration-300">
                        <h6 class="px-2 hover:px-4 duration-300">Detalles</h6>
                        <i class="px-2 hover:px-4 duration-300 fa-solid fa-angle-right"></i>
                    </div>
                </button>
            </div>
        </div>
    `
}

// Specialists
fetch(`http://127.0.0.1:3000/patientSpecialist/mySpecialists/${user_id}`)
.then(res => {
    if(res.ok) {
        return res.json();
    }
})
.then(data => {
    for(let specialist of data) {
        specialistsListElement.innerHTML += specialistComponent(specialist);
    }
})

// Requests
fetch(`http://127.0.0.1:3000/requests/patient/${user_id}`)
.then(res => {
    if(res.ok) {
        return res.json()
    }
})
.then(data => {
    for(let request of data) {
        requestsListElement.innerHTML += requestComponent(request);
    }
})