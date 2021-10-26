//Capturamos elementos del DOM
const inputTarea = document.querySelector('.inputTarea');
const prioridad = document.querySelector('#selectPrioridad');
const guardar = document.querySelector('.btnGuardar')

const filtTarea = document.querySelector('.filtrarTareaInput');


let tareas = new Array();
//Nos traemos los datos de localStorage y los transformamos con JSON.parse
if (JSON.parse(localStorage.getItem('tareas'))) {
    //Si hay información nos la traemos
    tareas = JSON.parse(localStorage.getItem('tareas'));
} else {
    //Sino lo inicializamos a array vacío
    tareas = [];
}

//Escuchamos el evento click en el boton de crear tarea
guardar.addEventListener('click', (event) => {
    event.preventDefault();

    if (inputTarea !== "") {

        crearTarea();

    }
})

function crearTarea() {
    //Creamos el html y css de la tarea a añadir
    const li = document.createElement("li");
    li.classList.add('tarea')

    const div = document.createElement("div");
    div.innerText = inputTarea.value;

    const btn = document.createElement("button");
    btn.classList.add('eliminar');
    btn.classList.add(tareas.length + 1);
    btn.innerText = "eliminar";

    //Introducimos cada elemento dentro del contenedor li
    li.appendChild(div);
    li.appendChild(btn);

    //Lo introducimos en el contenedor de tareas, ul
    const ul = document.querySelector('ul');
    ul.appendChild(li);

    //Cambiamos el color de fondo dependiendo de la prioridad
    addColorPrioridad(li, prioridad.value);

    //Creamos evento para borrar tareas
    btn.addEventListener('click', (event) => {
        //Borramos la tarea del HTML
        li.remove();

        //Buscamos el indice de la tarea a borrar, anteriormente le hemos dado la 
        //Segunda clase del elemento el valor de su id
        const indexTareaABorrar = tareas.findIndex(tarea => {
            tarea.id === btn.classList[1]
        });

        //Borramos la tarea del array
        tareas.splice(indexTareaABorrar, 1);

        //Guardamos en localStorage el array con la tarea borrada
        localStorage.setItem('tareas', JSON.stringify(tareas));

    })
}

// crear funcion para generar color por prioridad

function addColorPrioridad(pLi, pValue) {

    if (pValue === 'Urgente') {
        pLi.classList.add("rojo");
    } else if (pValue === 'Diaria') {
        pLi.classList.add("azul");
    } else if (pValue === 'Mensual') {
        pLi.classList.add("yellow");
    }
}

// LocalStorage

guardar.addEventListener('click', saveLocalStorage);

function saveLocalStorage(event) {
    event.preventDefault();

    //Creamos el objeto con la informacion de la tarea
    const nuevaTarea = {
        id: tareas.length + 1,
        nombre: inputTarea.value,
        colorPrioridad: prioridad.value
    }

    //Añadimos la nueva tarea al array con todas las tareas
    tareas.unshift(nuevaTarea);

    //Guardamos de nuevo el array en localStorage, conviertiendo la
    //informacion con Json.stringify
    localStorage.setItem('tareas', JSON.stringify(tareas));

    //Vaciamos el value del input
    inputTarea.value = "";

}



//FILTRAR POR PRIORIDAD

// const filtPrioridad = document.querySelector('#filtrarTarea');
// filtPrioridad.addEvenListener('change', filtrarTareasPrioridad);
// function filtrarTareasPrioridad(event){
//     if(filtPrioridad.value === nuevaTarea.colorPrioridad){
//         crearTarea();
//         return false
//     }
//     console.log("dsg")
//     let listaFiltradaPorPrioridad = FiltrarTareasPrioridad (pPrioridad);
//     crearTarea();
// }

// const filtPrioridad = document.querySelector('#filtrarTarea');

// filtPrioridad.addEventListener('change', filtrarTareasPrioridad);

// function filtrarTareasPrioridad(event){

//     if(filtPrioridad.value === nuevaTarea.colorPrioridad){
//         crearTarea()
//     }
// }








