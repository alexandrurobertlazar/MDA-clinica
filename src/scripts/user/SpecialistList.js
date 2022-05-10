const specialistsListElement = document.getElementById('specialists-lists')
const requestsListElement = document.getElementById('requests-lists')

function navigateToRequestChange(value) {
    window.localStorage.setItem("specialist_to_change", value.value);
    window.open("./CreateSpecialistChangeRequest.html", '_self');
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
            <div class="flex flex-col p-2">
                <button
                class="p-2 text-blue-700"
                value=${specialist.id}
                onclick=navigateToRequestChange(this)>
                    <div class="flex items-center hover:shadow hover:rounded duration-300">
                        <h6 class="px-2 hover:px-4 duration-300">Cambiar</h6>
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