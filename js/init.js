//Nos taremos el array con todas las tareas
let tareasArray = JSON.parse(localStorage.getItem('tareas'));

//Recorremos cada tarea del array
tareasArray.forEach(tarea=>{
    //Llamamos a la función de crear tarea en el HTML
    crearTarea(tarea.nombre, tarea.colorPrioridad);
})

function crearTarea(nombre, colorPrioridad) {
    //Creamos el html y css de la tarea a añadir
    const li = document.createElement("li");
    li.classList.add('tarea')

    const div = document.createElement("div");
    div.innerText = nombre;

    const btn = document.createElement("button");
    btn.classList.add('eliminar');
    btn.innerText = "eliminar";

    //Introducimos cada elemento dentro del contenedor li
    li.appendChild(div);
    li.appendChild(btn);

    //Lo introducimos en el contenedor de tareas, ul
    const ul = document.querySelector('ul');
    ul.appendChild(li);

    console.log(colorPrioridad)
    //Cambiamos el color de fondo dependiendo de la prioridad
    addColorPrioridad(li, colorPrioridad);

    //Creamos evento para borrar tareas
    btn.addEventListener('click', (event) => {
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

function addColorPrioridad(pLi, pValue) {

    if (pValue === 'Urgente') {
        pLi.classList.add("rojo");
    } else if (pValue === 'Diaria') {
        pLi.classList.add("azul");
    } else if (pValue === 'Mensual') {
        pLi.classList.add("yellow");
    }
}
