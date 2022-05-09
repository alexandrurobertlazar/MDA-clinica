const assignFormElement = document.getElementById("assign-form");
const selectPatient = document.getElementById("selectPatient");
const selectSpecialist = document.getElementById("selectSpecialist");
const id_assign = localStorage.getItem("id_assign");
var id_patient ="";
var id_specialist ="";
var selectedPatient = undefined;
var selectedSpecialist = undefined;
var namePatientDefault = undefined;
var nameSpecialistDefault = undefined;

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

// Fetch old data
fetch(`http://127.0.0.1:3000/patientSpecialist/names`)
.then(res => {
    if(!res.ok) {
        // Mostrar error al usuario
    } else {
        return res.json();
    }
})
.then(data => {
    data.forEach(assign => {
        if(assign.id_assign === id_assign){
            selectedPatient = document.getElementById(assign.id_patient);
            selectedSpecialist = document.getElementById(assign.id_specialist);
            namePatientDefault = assign.id_patient;
            nameSpecialistDefault = assign.id_specialist;
            selectedPatient.setAttribute("selected", true);
            selectedSpecialist.setAttribute("selected", true);
        }
    });
});

// Selected Patients
selectPatient.addEventListener('change',
  function(){
    var selectedOption = this.options[selectPatient.selectedIndex];
    id_patient = selectedOption.id; 
});

// Selected Specialists
selectSpecialist.addEventListener('change',
  function(){
    var selectedOption = this.options[selectSpecialist.selectedIndex];
    id_specialist = selectedOption.id; 
});

/**
 * SUBMIT
 */
assignFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    var assignData = {
        id_patient: id_patient,
        id_specialist: id_specialist,
    }

    if(id_patient==="" && id_specialist!==""){
        assignData = {
            id_patient: namePatientDefault,
            id_specialist: id_specialist,
        }
    } else if(id_specialist==="" && id_patient!==""){
        assignData = {
            id_patient: id_patient,
            id_specialist: nameSpecialistDefault,
        }
    } else if(id_specialist==="" && id_patient===""){
        assignData = {
            id_patient: namePatientDefault,
            id_specialist: nameSpecialistDefault,
        }
    }
     
    fetch(`http://127.0.0.1:3000/patientSpecialist/${id_assign}`, {
        method: 'PUT',
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
});

