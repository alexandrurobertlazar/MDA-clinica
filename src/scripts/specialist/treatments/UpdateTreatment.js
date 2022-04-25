const subjectInputElement = document.getElementById("subject");
const nameTextAreaElement = document.getElementById("description");
const userFormElement = document.getElementById("user-form");
const id_treatment = localStorage.getItem("id_treatment");
const id_specialist = localStorage.getItem("user_id");
const id_patient = localStorage.getItem("id_patient"); 
const subtitle = document.getElementById("subtitle"); 

// New treatment data
const treatmentData = {
    id_patient: id_patient,
    id_specialist: id_specialist,
    subject: "",
    description: "",
};

// Validation error
const validationError = {
    subject: false,
    description: false
}

if(!id_treatment) {
    history.back();
}

// Fetch old data
fetch(`http://127.0.0.1:3000/treatments/treatment/${id_treatment}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(treatment => {
    subjectInputElement.defaultValue = treatment.subject;
    nameTextAreaElement.defaultValue = treatment.description;

    treatmentData.subject = treatment.subject;
    treatmentData.description = treatment.description;
});

//Fetch subtitle of listTreatment
fetch(`http://127.0.0.1:3000/users/${id_patient}`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    subtitle.innerHTML = `En esta página podrá actualizar el tratamiento del paciente ${data.name}`;
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
        document.getElementById("submit-error-treatment").classList.remove("hidden");
    } else {
        fetch(`http://127.0.0.1:3000/treatments/${id_treatment}`, {
            method: 'PUT',
            body: JSON.stringify(treatmentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                // Mostrar error al usuario
            } else {
                document.getElementById("submit-error-treatment").classList.add("hidden");
                document.getElementById("success-container-treatment").classList.add('flex');
                document.getElementById("success-container-treatment").classList.remove('hidden');
                userFormElement.classList.add('hidden');
                userFormElement.classList.remove('flex');
            }
        });
    }
});

/**
 * INPUTS VALIDATIONS
 */
subjectInputElement.addEventListener('change', (event) => {
    const value = event.target.value;
    if(value.length < 5 || value.length > 20) {
        validationError.subject = true;
        document.getElementById("subject-error").classList.remove('hidden');
    } else {
        document.getElementById("subject-error").classList.add('hidden');
        validationError.subject = false;
        treatmentData.subject = value;
    }
});

nameTextAreaElement.addEventListener('change', (event) => {
    const value2 = event.target.value;
    if(value2.length < 10 || value2.length > 50) {
        validationError.description = true;
        document.getElementById("description-error").classList.remove('hidden');
    } else {
        document.getElementById("description-error").classList.add('hidden');
        validationError.description = false;
        treatmentData.description = value2;
    }
});