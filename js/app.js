// variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
     // Cuando agregar un curso presinando "agregar al carrito"
     listaCursos.addEventListener('click', agregarCurso);

     //eliminar cursos del carrito
     carrito.addEventListener('click', borrarItem);

     // vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', () =>{
          articulosCarrito = [];
          limpiarHTML();
     });

}

//funciones
function agregarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')){
          const cursoSeleccionado = e.target.parentElement.parentElement;

          leerDatos(cursoSeleccionado);
     }     
}

// leer el contenido del HTML al que le dimos click y extraer la infomracion del curso
function leerDatos(curso){
     // console.log(curso.children[1].children[1].textContent)

     // Crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.children[0].src,
          nombre: curso.children[1].children[0].textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     //revisa si un elemento esta en el carrito
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
     if(existe){
          // actualizamos la cantidad 
          const cursos = articulosCarrito.map( curso => {
               if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;  // retorna el objeto actualizado
               }else {
                    return curso; // retorna los objetos que no estan duplicados
               }
          });
          articulosCarrito = [...cursos];
     }else{
          articulosCarrito = [...articulosCarrito, infoCurso];
     }


     
          
         
          console.log(articulosCarrito);
     // agregar elementos al carro del carrito
     

     carritoHTML();
     
}

// muestra el carrito de compras en el HTML
function carritoHTML(){
     //Limpiar el HTML
     limpiarHTML();


     articulosCarrito.forEach( curso => {    
          const { imagen, nombre, precio, cantidad, id} = curso;    

          //recorre el carrito y genera el HTML
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${imagen}" width="90">
               </td>
               <td>
                    ${nombre}
               </td>
               <td>
                    ${precio}
               </td>
               <td>
                    ${cantidad}
               </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}" > X </a>
               </td>
               
          `;

          // agregar el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row);
     });

}

//Elimina los cursos del tbody
function limpiarHTML(){
     //forma lenta
     // contenedorCarrito.innerHTML = '';

     while(contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

//eliminar curso seleccionado
function borrarItem(e){
     if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute('data-id');

            //elimina del arreglo por el data-id
            articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

            carritoHTML(); // iterar sobre el carrito y mostrar el HTML

            console.log(articulosCarrito);

     }
}