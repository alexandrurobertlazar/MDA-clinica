//Campos del formulario de login
const usuario = document.getElementById('email');
const contra = document.getElementById('password');

//Al enviar el formulario, se valida si todos sus campos cumplen con las resticciones propuestas.
$(document).ready(function(){
    const form = document.getElementById('formulario_login');
    form.addEventListener('submit', e => {

        // Función que valida la información del formulario
        if(loginValidacion(e)){
            /**
             * FETCH USER DATA
             */
            fetch(`http://localhost:3000/users/login`,{
                method: "POST",
                body: JSON.stringify({
                    "email": usuario.value,
                    "password": contra.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if(!res.ok) {
                    console.log("ERROR");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                localStorage.setItem("user_id",data.id);
                localStorage.setItem("role",data.role);
                window.location.href = 'http://127.0.0.1:5500/src/view/index.html';
            })
        }
    });
});

//Validación del formulario de login
function loginValidacion(evento) {
    evento.preventDefault();
    
    //Variable de control que maneja cuando el usuario y contraeña son válidos.
    var control;

    //Mensaje de error.
    let error_usuario = document.getElementById('error_usuario');
    let error_contra = document.getElementById('error_contra');  
    
    //Reseteamos valores por defecto
    error_usuario.innerHTML = "";
    error_contra.innerHTML = "";

    //Restricciones campo Usuario.
    if(usuario.value.trim().length < 6){
        control=true;
        error_usuario.innerHTML = "<p>¡Email inválido!. El email debe contener mínimo 6 caracteres</p>"; 
        colorFocusEmail();
        usuario.focus();
    } else if(!esEmail(usuario.value.trim())){
        control=true;
        error_usuario.innerHTML += "<p>¡Email inválido!. Un email válido podría ser: jose.mda.99@gmail.com</p>";
        colorFocusEmail();
        usuario.focus();
    } else {
        error_usuario.innerHTML = "";
    }

    //Restricciones campo Contraseña.
    if(contra.value.trim().length < 8){
        control=true;
        error_contra.innerHTML = "<p>¡Contraseña inválida!. La contraseña debe contener como mínimo 8 caracteres</p>";
        colorFocusContra();
        contra.focus(); 
    } else {
        error_contra.innerHTML = "";
    }

    //Valor devuelto por la función.
    if(control){
        return false;
    } else {
        return true;
    }
}

//Función que analiza si el email del campo usuario es un email válido.
function esEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//Efecto focus del campo inválido del formulario de login
function colorFocusEmail (){
    $('#email').focus(function() {
        $(this).css('outline-color','red');
    });
}

function colorFocusContra (){
    $('#password').focus(function() {
        $(this).css('outline-color','red');
    });
}

