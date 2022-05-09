const assignFormElement = document.getElementById("assign-form");
const selectPatient = document.getElementById("selectPatient");
const selectSpecialist = document.getElementById("selectSpecialist");
var id_patient ="";
var id_specialist ="";

// Validation error
const validationError = {
    patient: false,
    specialist: false
}

// Custom component for show each patient
const selectPatientComponent = (patients) => {
    return (`
           <option id='${patients.id}' value='${patients.name}'>${patients.name}</option>
    `);
}

// Custom component for show each specialist
const selectSpecialistComponent = (specialists) => {
    return (`
           <option id='${specialists.id}' value='${specialists.name}'>${specialists.name}</option>
    `);
}

// Fetch Patients
fetch(`http://127.0.0.1:3000/users/role/patient`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    selectPatient.innerHTML+="<option value='Selecciona un paciente' selected disabled>Selecciona un paciente</option>"
    data.forEach(patients => {
        selectPatient.innerHTML+=selectPatientComponent(patients);
    });
});

// Fetch Specialists
fetch(`http://127.0.0.1:3000/users/role/specialist`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    selectSpecialist.innerHTML+="<option value='Selecciona un especialista' selected disabled>Selecciona un especialista</option>"
    data.forEach(specialist => {
        selectSpecialist.innerHTML+=selectSpecialistComponent(specialist);
    });
});

// Selected Patients
selectPatient.addEventListener('change',
  function(){
    var selectedOption = this.options[selectPatient.selectedIndex];
    // Option seleccionado
    id_patient = selectedOption.id; 
    flagPatient = true;
});

// Selected Specialists
selectSpecialist.addEventListener('change',
  function(){
    var selectedOption = this.options[selectSpecialist.selectedIndex];
    // Option seleccionado
    id_specialist = selectedOption.id; 
    flagSpecialist = true;
});

/**
 * SUBMIT
 */
assignFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const assignData = {
        id_patient: id_patient,
        id_specialist: id_specialist,
    };

    var validation = true;
    Object.entries(validationError).forEach(error => {
        const [, value] = error;
        if(value) {
            validation = false;
        }
    });

    validation = validationsSelect(id_patient, id_specialist, validation);

    if(!validation) {
        document.getElementById("submit-error-assign").classList.remove("hidden");
    } else {
        fetch(`http://127.0.0.1:3000/patientSpecialist`, {
            method: 'POST',
            body: JSON.stringify(assignData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                // Mostrar error al usuario
            } else {
                document.getElementById("submit-error-assign").classList.add("hidden");
                document.getElementById("success-container-assign").classList.add('flex');
                document.getElementById("success-container-assign").classList.remove('hidden');
                assignFormElement.classList.add('hidden');
                assignFormElement.classList.remove('flex');
            }
        });
    }
});

// Validations
function validationsSelect(id_patient, id_specialist, validation) {
    if(id_patient===""){
        validation=false;
        validationError.patient = true;
        document.getElementById("patient-error").classList.remove('hidden');
    } else {
        validation=true;
        validationError.patient = false;
        document.getElementById("patient-error").classList.add('hidden'); 
    }

    if(id_specialist===""){
        validation=false
        validationError.specialist = true;
        document.getElementById("specialist-error").classList.remove('hidden');
    } else {
        validation=true;
        validationError.specialist = false;
        document.getElementById("specialist-error").classList.add('hidden'); 
    }

    return validation;
}