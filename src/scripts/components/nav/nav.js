// Obtener el rol del usuario iniciado en el sitio web del almacenamiento local
// para los distintos ítems del navbar.
let role = localStorage.getItem("role");


class NavBar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(){
        switch(role){
            // Navbar para el administrador
            case "admin":
                this.innerHTML = `
                <nav class="overflow-hidden bg-white shadow-lg px-2 sm:px-4 py-2.5 rounded">
                    <div class="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="/src/view/index.html" class="flex items-center text-blue-700">
                            <img src="/src/assets/logo.png" class="mr-3 h-10 sm:h-18" alt="Clínica ULPGC Logo">
                            <span class="self-center text-xl font-semibold whitespace-nowrap">Clínica ULPGC</span>
                        </a>
            
                        <div class="flex md:order-2">
                            <div class="relative mr-3 md:mr-0 md:block ">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3  ">
                                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                
                                <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Search...">
                            </div>
            
                            <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-4" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        <div class="hidden overflow-hidden items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
                            
                            <ul class="flex flex-col w-full mt-4 md:flex-row md:space-x-8 md:mt-0 ">
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 " aria-current="page">Inicio</a>
                                </li>
            
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/admin/users/UsersList.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Gestión de usuarios</a>
                                </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/user/profile.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Mi perfil</a>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" id="logout" class="block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`;
                break;
            
            // Navbar para el paciente
            case "patient": 
                this.innerHTML = `
                <nav class="overflow-hidden bg-white shadow-lg px-2 sm:px-4 py-2.5 rounded">
                    <div class="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="/src/view/index.html" class="flex items-center text-blue-700">
                            <img src="/src/assets/logo.png" class="mr-3 h-10 sm:h-18" alt="Clínica ULPGC Logo">
                            <span class="self-center text-xl font-semibold whitespace-nowrap">Clínica ULPGC</span>
                        </a>

                        <div class="flex md:order-2">
                            <div class="relative mr-3 md:mr-0 md:block ">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                
                                <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Search...">
                            </div>

                            <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-4" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        <div class="hidden overflow-hidden items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
                            
                            <ul class="flex flex-col w-full mt-4 md:flex-row md:space-x-8 md:mt-0 ">
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0" aria-current="page">Inicio</a>
                                </li>

                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Solicitudes</a>
                                </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/appointments/appointments.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Citas</a>
                                </li>
                                
                                <li>
                                    <div class="dropdown">
                                        <a class="flex items-center pr-4 pl-3 hpy:text-white rounded hpy:py-2 hpy:bg-blue-600 md:text-gray-700">Otros servicios 
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </a>
                                        
                                        <ul class="dropdown-menu z-50 absolute hidden block pt-1 hpy:w-full">
                                            <li>
                                                <a href="#" class="block text-blue-700 border-b bg-white border-gray-100 hover:text-blue-600 py-4 px-4 hover:bg-gray-50 ">Mi historial</a>
                                            </li>
                                            <li>
                                                <a href="/src/view/patient/SpecialistList.html" class="block text-blue-700 border-b bg-white border-gray-100 hover:text-blue-600 py-4 px-4 hover:bg-gray-50">Mis especialistas</a>
                                            </li>
                                            <li>
                                                <a href="/src/view/patient/mis_recetas.html" class="block text-blue-700 border-b bg-white border-gray-100 hover:text-blue-600 py-4 px-4 hover:bg-gray-50">Mis recetas</a>
                                            </li>
                                            <li>
                                                <a href="/src/view/user/profile.html" class="block text-blue-700 border-b bg-white border-gray-100 hover:text-blue-600 py-4 px-4 hover:bg-gray-50">Mi perfil</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" id="logout" class="block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <style>
                .dropdown:hover .dropdown-menu {
                    display: block;
                }
                </style>`;
                break;
            
            // Navbar para el especialista
            case "specialist":  
                this.innerHTML = `
                <nav class="overflow-hidden bg-white shadow-lg px-2 sm:px-4 py-2.5 rounded">
                    <div class="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="/src/view/index.html" class="flex items-center text-blue-700">
                            <img src="/src/assets/logo.png" class="mr-3 h-10 sm:h-18" alt="Clínica ULPGC Logo">
                            <span class="self-center text-xl font-semibold whitespace-nowrap">Clínica ULPGC</span>
                        </a>
            
                        <div class="flex md:order-2">
                            <div class="relative mr-3 md:mr-0 md:block">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                
                                <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Search...">
                            </div>
            
                            <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-4" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        <div class="hidden overflow-hidden items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
                            <ul class="flex flex-col w-full mt-4 md:flex-row md:space-x-8 md:mt-0 ">
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none" >
                                    <a href="/src/view/index.html" class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50  border-b border-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 " aria-current="page">Inicio</a>
                                </li>
            
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/specialist/treatments/ListPatients.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Mis pacientes</a>
                                </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                     <a href="/src/view/appointments/specialist/appointments_specialist.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Mis citas</a>
                                 </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/user/profile.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Mi perfil</a>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" id="logout" class="block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`;
                break;
            
            // Navbar para el auxiliar
            case "assistant":
                this.innerHTML = `
                <nav class="overflow-hidden bg-white shadow-lg px-2 sm:px-4 py-2.5 rounded">
                    <div class="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="/src/view/index.html" class="flex items-center text-blue-700">
                            <img src="/src/assets/logo.png" class="mr-3 h-10 sm:h-18" alt="Clínica ULPGC Logo">
                            <span class="self-center text-xl font-semibold whitespace-nowrap">Clínica ULPGC</span>
                        </a>
            
                        <div class="flex md:order-2">
                            <div class="relative mr-3 md:mr-0 md:block ">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3  ">
                                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                
                                <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 " placeholder="Search...">
                            </div>
            
                            <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-4" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        <div class="hidden overflow-hidden items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
                            
                            <ul class="flex flex-col w-full mt-4 md:flex-row md:space-x-8 md:mt-0 ">
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 " aria-current="page">Inicio</a>
                                </li>
            
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/auxiliar/history/patientList.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Pacientes</a>
                                </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/user/profile.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Mi perfil</a>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" id="logout" class="block py-2 pr-4 pl-3 text-blue-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Cerrar sesión</a>
                                </li>
                            </ul>
                        
                        </div>
                    </div>
                </nav>`;
                break;
            
            // Navbar para el usuario no registrado
            default:
                this.innerHTML = `
                <nav class="overflow-hidden bg-white shadow-lg px-2 sm:px-4 py-2.5 rounded">
                    <div class="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="/src/view/index.html" class="flex items-center text-blue-700">
                            <img src="/src/assets/logo.png" class="mr-3 h-10 sm:h-18" alt="Clínica ULPGC Logo">
                            <span class="self-center text-xl font-semibold whitespace-nowrap ">Clínica ULPGC</span>
                        </a>
            
                        <div class="flex md:order-2 ">
                            <div class="relative mr-3 md:mr-0 md:block ">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3  ">
                                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                
                                <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 " placeholder="Search...">
                            </div>
            
                            <button data-collapse-toggle="mobile-menu-4" data-collapse-toggle="mobile-menu-1" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-4" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    
                        <div class="hidden items-center w-full md:flex md:w-auto md:order-1 " id="mobile-menu-4">
                            
                            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0  ">
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/index.html" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 " aria-current="page">Inicio</a>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Nosotros</a>
                                </li>
                                
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-blue-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">Contacto</a>
                                </li>
                                <li class="hover:border-b-2 hover:translate-x-1 hover:border-gray-600 hpy:border-none">
                                    <a href="/src/view/login/login.html" class="block py-2 pr-4 pl-3 text-white bg-blue-600 rounded md:bg-transparent md:text-blue-700 md:p-0 ">Iniciar sesión</a>
                                </li>
                            </ul>
                        
                        </div>
                    </div>
                </nav>`;

        }
        
    }
}

window.onload = function() {
    // Función para cerrar sesión.
    document.getElementById('logout').onclick = function () {
        localStorage.clear();
    }
}
               
window.customElements.define('load-nav', NavBar);
