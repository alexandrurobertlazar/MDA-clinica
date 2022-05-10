const requestsListElement = document.getElementById('requests-lists')

const textError = document.getElementById('text-error')

function navigateToRequestChange(value) {
    window.localStorage.setItem("specialist_to_change", value.value);
    window.open("./CreateSpecialistChangeRequest.html", '_self');
}

const user_id = window.localStorage.getItem('user_id')
if(!user_id) {
    window.open('/src/view/index.html', '_self');
}

const requestComponent = (request) => {
    return `
        <div class="flex flex-wrap items-center content-between justify-evenly rounded border shadow m-2 w-3/4">
            <div class="flex flex-col p-2">
                <h3 class="font-bold">Especialista</h3>
                <h5 class="font-light">${request.specialist.name}</h5>
                <h3 class="font-bold">Antiguo especialista</h3>
                <h5 class="font-light">${request.old_specialist.name}</h5>
            </div>
            <div class="flex justify-end p-2">
                <p class="font-light">${request.reason}</p>
            </div>
        </div>
    `
}

fetch(`http://127.0.0.1:3000/requests/patient/${user_id}`)
.then(res => {
    if(res.ok) {
        return res.json()
    } else {
        textError.classList.remove('hidden')
        textError.classList.add('block')
    }
})
.then(data => {
    for(let request of data) {
        requestsListElement.innerHTML += requestComponent(request);
    }
})