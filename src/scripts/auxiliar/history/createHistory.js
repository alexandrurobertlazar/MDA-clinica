const nameInputElement = document.getElementById("subject");
const nameTextAreaElement = document.getElementById("description");
const userFormElement = document.getElementById("history-form");

const id_history = localStorage.getItem("id_history");
const user_id = localStorage.getItem("user_id");
const id_patient = localStorage.getItem("id");

const subtitle = document.getElementById("subtitle");
// New history data
const historyData = {
    id_patient: id_patient,
    id_specialist: user_id,
    subject: "",
    description: ""
};

// Validation error
const validationError = {
    subject: false,
    description: false
}

// Fetch name patient (subtitle)
fetch(`http://127.0.0.1:3000/users/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    subtitle.innerHTML = `Cree una nueva prueba clínica para el paciente ${data.name}`;
});


/**
 * SUBMIT
 */
userFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    var validation = true;
    Object.entries(validationError).forEach(error => {
        const [, value] = error;
        if(value) {
            validation = false;
        }
    });
    if(!validation) { 
        document.getElementById("submit-error").classList.remove("hidden");
    } else {
        console.log(historyData);
        fetch(`http://127.0.0.1:3000/history`, {
            method: 'POST',
            body: JSON.stringify(historyData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                // Mostrar error al usuario
            } else {
                document.getElementById("submit-error").classList.add("hidden");
                document.getElementById("success-container").classList.add('flex');
                document.getElementById("success-container").classList.remove('hidden');
                userFormElement.classList.add('hidden');
                userFormElement.classList.remove('flex');
            }
        });
    }
});


/**
 * INPUTS VALIDATIONS
 */
nameInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 5 || value.length > 20) {
        validationError.subject = true;
        document.getElementById("subject-error").classList.remove('hidden');
    } else {
        document.getElementById("subject-error").classList.add('hidden');
        validationError.subject = false;
        historyData.subject = value;
    }
});


nameTextAreaElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 10 || value.length > 50) {
        validationError.description = true;
        document.getElementById("description-error").classList.remove('hidden');
    } else {
        document.getElementById("description-error").classList.add('hidden');
        validationError.description = false;
        historyData.description = value;
    }
})



