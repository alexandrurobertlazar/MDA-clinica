const newSpecialistSelector = document.getElementById("new-specialist")
const changeReason = document.getElementById("change-reason")

const changeForm = document.getElementById("change-form")


const old_specialist = window.localStorage.getItem("specialist_to_change");
const user_id = window.localStorage.getItem("user_id")

if (!old_specialist || !user_id) {
    window.history.back();
}

fetch(`http://127.0.0.1:3000/users/role/specialist`)
.then(res => {
    if(res.ok) {
        return res.json();
    }
})
.then(data => {
    for(let specialist of data) {
        if(specialist.id !== old_specialist) {
            newSpecialistSelector.innerHTML += `<option value=${specialist.id}>${specialist.name}</option>`;
        }
    }
})


changeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const changeRequest = {
        patient_id: user_id,
        specialist_id: newSpecialistSelector.value,
        old_specialist: old_specialist,
        reason: changeReason.value.trim()
    }
    fetch(`http://127.0.0.1:3000/requests/`, {
        method: 'POST',
        body: JSON.stringify(changeRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.ok) {
            window.open("/src/view/patient/SpecialistList.html", "_self");
        }
    })
})