const user_id = localStorage.getItem("user_id");
const url =`http://127.0.0.1:3000/analytics/esp/${user_id}`
const pruebas = document.getElementById("pruebas");
const noPruebas=document.getElementById("noPruebas");

var markedAnalytics =[];

function checkboxEvent(checkbox) {
    if(checkbox.checked) {
        markedAnalytics.push(checkbox.value);
        
    } else { 
        markedAnalytics = markedAnalytics.filter(id => id !== checkbox.value);
    }
}

fetch(url).then(res=>{
    if(!res.ok){
    } else{
        return res.json();
    }
})
.then(data =>{
    if(data.length == 0){
        noPruebas.innerHTML=`<h1 class="text-center text-xl font-bold">No tiene pruebas<h1>`
    } else{
        noPruebas.innerHTML='';
        data.sort((a, b) => {
            //Dia
            var [day1, month1, year1] = a.date.split('-');
            var dayA = parseInt(day1)
            var monthA = parseInt(month1);
            var yearA = parseInt(year1);
            var [day2, month2, year2] = b.date.split('-');
            var dayB = parseInt(day2)
            var monthB = parseInt(month2);
            var yearB = parseInt(year2);

            if(yearA < yearB) return -1;
            if(yearA > yearB) return 1;
            if(yearA === yearB) {
                if(monthA < monthB) return -1;
                if(monthA > monthB) return 1;
                if(monthA === monthB) {
                    if(dayA < dayB) return -1;
                    if(dayA > dayB) return 1;
                    if(dayA === dayB) return -1;
                };
            };
            return 0;
        });

        data.forEach(analytic => {
            let dateRaw = analytic.date;
            let [year, month, day] = dateRaw.split("-");
            let date = day+"-"+month+"-"+year;
            let analytic_id = analytic.id;
            let desc = analytic.desc;
            fetch(`http://127.0.0.1:3000/users/${analytic.patient}`).then(res =>{
                if(res.ok){
                    return res.json();
                }
            }).then(data =>{
                pruebas.innerHTML += `
                <li id=${analytic_id}>
                    <div class="flex justify-between content-center items-center flex-wrap rounded border m-4 md:m-8 p-2.5 transition duration-300 ease-in-out hover:bg-gray-100">
                        <div class="flex flex-row items-center justify-start">
                            <input type="checkbox" value=${analytic_id} onchange="checkboxEvent(this)" class="m-2"> 
                            <div id="info-cita">
                                <label id="paLabel" class="mx-1 font-bold">Paciente: </label>
                                <label id="doc" class="mr-3">  ${data.name} </label>
                                <label id="dateLabel" class="mx-1 font-bold">Fecha: </label>
                                <label id="fecha" class="mr-3">${date}</label>
                                <label id="descLabel" class="mx-1 font-bold">Descripción: </label>
                                <label id="desc" class="mr-3"> ${desc} </label>
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-content-end">
                            <button 
                            value=${analytic_id}
                            onclick="updateAnalytic(this)"
                            class="bg-blue-500 text-white font-bold px-3 py-2 rounded m-2"
                            >
                                <div class="flex items-center hover:shadow hover:rounded duration-300">
                                    <h6 class="px-2 hover:px-4 duration-300">Modificar</h6>
                                    <i class="px-2 hover:px-4 duration-300 fa-solid fa-angle-right"></i>
                                </div>
                            </button>
                            <button
                            value=${analytic_id}
                            class="bg-red-500 text-white font-bold px-3 py-2 rounded m-2" 
                            onclick="deleteAnalytic(this)"
                            >
                                <h6 class="px-2 hover:px-4 duration-300">Eliminar</h6>
                            </button>
                        </div>
                    </li>
                </div>
                `;
            });
        });
    }
});

function updateAnalytic(data){
    localStorage.setItem("analyticData", data.value);
    window.open("./updateAnalytic.html", "_self");
}

function createAnalytic(){
    window.open("./createAnalytic.html", "_self");
}

function deleteAnalytic(app_id){
    fetch(`http://127.0.0.1:3000/analytics/${app_id.value}`,{
        method: 'DELETE'
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
    }).then(data =>{
        const oldElement = document.getElementById(app_id.value);
        oldElement.parentNode.removeChild(oldElement);
    });
}

function deleteSelectedAnalytics(){
    markedAnalytics.forEach(app =>{
        fetch(`http://127.0.0.1:3000/analytics/${app}`,{
            method: 'DELETE'
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
        }).then(data =>{
            const oldElement = document.getElementById(app);
            oldElement.parentNode.removeChild(oldElement);
        });
    });
}