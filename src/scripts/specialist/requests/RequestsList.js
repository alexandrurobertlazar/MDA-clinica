const requestContainer = document.getElementById('requests-container')

const user_id = window.localStorage.getItem('user_id')
if(!user_id) {
    window.open("/src/view/index.html", '_self')
}

function acceptRequest(value) {
    const { value: request } = value
    fetch("http://127.0.0.1:3000/requests/accept", {
        method: 'POST',
        body: JSON.stringify({request_id: request}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.ok) {
            window.open("/src/view/specialist/treatments/ListPatients.html", "_self");
        }
    })
    
}

function deleteRequest(value) {
    const { value: request_id } = value
    fetch(`http://127.0.0.1:3000/requests/${request_id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if(res.ok) {
            window.open("/src/view/specialist/treatments/ListPatients.html", "_self");
        }
    })

}

const requestComponent = (request) => {
    return `
        <div class="flex flex-wrap items-center content-between justify-evenly rounded border shadow m-2 w-3/4">
            <div class="flex flex-col p-2">
                <h3 class="font-bold">Paciente</h3>
                <h5 class="font-light">${request.patient.name}</h5>
            </div>
            <div class="flex justify-end p-2">
                <p class="font-light">${request.reason}</p>
            </div>
            <div class="flex flex-col p-2">
                <button
                class="p-2 text-blue-700"
                value=${request.id}
                onclick=acceptRequest(this)>
                    <div class="flex items-center hover:shadow hover:rounded duration-300">
                        <h6 class="p-2 hover:px-4 duration-300">Aceptar</h6>
                        <i class="p-2 hover:px-4 duration-300 fa-solid fa-check"></i>
                    </div>
                </button>
                <button
                class="p-2 text-red-700"
                value=${request.id}
                onclick=deleteRequest(this)>
                    <div class="flex items-center hover:shadow hover:rounded duration-300">
                        <h6 class="p-2 hover:px-4 duration-300">Rechazar</h6>
                        <i class="p-2 hover:px-4 duration-300 fa-solid fa-trash"></i>
                    </div>
                </button>
            </div>
        </div>
    `
}

fetch(`http://127.0.0.1:3000/requests/specialist/${user_id}`)
.then(res => {
    if(res.ok) return res.json()
})
.then(data => {
    for(let request of data) {
        requestContainer.innerHTML += requestComponent(request);
    }
})