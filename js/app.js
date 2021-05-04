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

     console.log(infoCurso)
}