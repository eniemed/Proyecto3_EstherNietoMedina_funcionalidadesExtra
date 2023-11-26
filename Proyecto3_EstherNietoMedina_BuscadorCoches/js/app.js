/* 
Proyecto 3 - Añadir funcionalidades
Esther Nieto Medina 2º DAW 
*/

//Selectores

const modal = new bootstrap.Modal("#modal", {})

const carrito = document.querySelector("#carrito")
const marca = document.querySelector("#marca")
const year = document.querySelector("#year")
const minimo = document.querySelector("#minimo")
const maximo = document.querySelector("#maximo")
const puertas = document.querySelector("#puertas")
const transmision = document.querySelector("#transmision")
const color = document.querySelector("#color")
const container = document.querySelector("#lista-carrito tbody")

const contenedor = document.querySelector("#resultado")

vaciarCarritoBTN = document.querySelector("#vaciar-carrito")

const precioTotal = document.querySelector("#precio-total")

const entrada = document.querySelector("#entrada")

const meses = document.querySelector("#meses")

const resultadoFinanciacion = document.querySelector("#resultado-financiacion")

const btnCalcular = document.querySelector("#calcular-financiacion")

const datosBusqueda = [
    {
        marca: '',
        year: '',
        minimo: '',
        maximo: '',
        puertas: '',
        transmision: '',
        color: '',
        id:''
    }
]

//lista que almacena los coches en formato objeto
let listaCochesCarrito = []

//se imprime el carrito desde el principio para que cuando se entre a la página se muestren ya los valores guardados
carritoHTML()

//crear los años del select al vuelo con sus datos
const max = new Date().getFullYear()
const min = max - 10

for (let i = max; i > min; i--) {
    const option = document.createElement("option")
    option.value = i
    option.textContent = i
    year.appendChild(option)
}


//Listeners

document.addEventListener("DOMContentLoaded", () => {
    mostrarCoches(coches)
})

btnCalcular.addEventListener("click", calcular)

carrito.addEventListener("click", eliminarCoche)

vaciarCarritoBTN.addEventListener("click", () => {
    listaCochesCarrito = []
    localStorage.removeItem("Coches")
    limpiarCarritoHTML()
})

marca.addEventListener("input", (e) => {
    datosBusqueda.marca = e.target.value
    filtrarCoches()
})

year.addEventListener("input", (e) => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarCoches()
})

minimo.addEventListener("input", (e) => {
    datosBusqueda.minimo = parseInt(e.target.value)
    filtrarCoches()
})

maximo.addEventListener("input", (e) => {
    datosBusqueda.maximo = parseInt(e.target.value)
    filtrarCoches()
})

puertas.addEventListener("input", (e) => {
    datosBusqueda.puertas = parseInt(e.target.value)   
    filtrarCoches()
})

transmision.addEventListener("input", (e) => {
    datosBusqueda.transmision = e.target.value  
    filtrarCoches()
})

color.addEventListener("input", (e) => {
    datosBusqueda.color = e.target.value
    filtrarCoches()
})


//Funciones

function calcular(e) {
    e.preventDefault()
    let total

    if (precioTotal.value.trim() !== "" && meses.value.trim() !== "") {
        if (entrada.value.trim() === "") {
            entrada.value = 0
        }

        total = (parseFloat((precioTotal.value - entrada.value) / meses.value)).toFixed(2)
    } else {
        total = "Rellena los campos obligatorios para averiguar el total"
    }

    resultadoFinanciacion.textContent = total
}

function limpiarHTML(selector) { //limpiamos el contenedor
    while (selector.firstChild) { //mientras que contenedor tenga un primer hijo se borra
        selector.removeChild(selector.firstChild)
    }
}

//opciones de filtrado
function filtrarCoches() {
    const resultado = coches.filter(filtrarMarca) //filter recibe una función de flecha, pero es lo mismo hacer una función a parte y llamarla aquí
    .filter(filtrarYear)
    .filter(filtrarColor)
    .filter(filtrarMaximo)
    .filter(filtrarMinimo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)

    if (resultado.length) {
        mostrarCoches(resultado)
    } else {
        noResultado()
    }
}

//añade un mensaje cuando no hay resultados para los datos seleccionados por el usuario
function noResultado() {
    limpiarHTML(contenedor)
    const noResultado = document.createElement("div")
    noResultado.classList.add("alerta", "error") //no hace falta ponerle un . porque estas clases las estamos añadiendo, el . es solo para recuperarlas
    noResultado.textContent = "No hay resultados"
    contenedor.appendChild(noResultado)
}

function filtrarMarca(coche) { 
    if (datosBusqueda.marca) {
        return coche.marca === datosBusqueda.marca //si la marca de algún coche coincide con la marca del objeto que se va creando cuando pinchamos, lo devuelve
        //y esa será la única marca que se mostrará.
    }
    return coche
//los añado abajo, por eso hay que limpiar primero en la función que muestra los coches
}


//LO MISMO CON CADA PROPIEDAD DEL COCHE
function filtrarYear(coche) { 

    if (datosBusqueda.year) {
        return coche.year === datosBusqueda.year 
    }
    return coche
}

function filtrarPuertas(coche) { 

    if (datosBusqueda.puertas) {
        return coche.puertas === datosBusqueda.puertas 
    }
    return coche
}

function filtrarMinimo(coche) { 

    if (datosBusqueda.minimo) {
        return coche.precio >= datosBusqueda.minimo 
    }
    return coche
}

function filtrarMaximo(coche) { 

    if (datosBusqueda.maximo) {
        return coche.precio <= datosBusqueda.maximo 
    }
    return coche
}

function filtrarPuertas(coche) { 

    if (datosBusqueda.puertas) {
        return coche.puertas === datosBusqueda.puertas 
    }
    return coche
}

function filtrarTransmision(coche) { 

    if (datosBusqueda.transmision) {
        return coche.transmision === datosBusqueda.transmision 
    }
    return coche
}

function filtrarColor(coche) { 

    if (datosBusqueda.color) {
        return coche.color === datosBusqueda.color 
    }
    return coche
}


function mostrarCoches(coches = []) {
    limpiarHTML(contenedor)
  
    //con este for anidado mostramos los coches de 3 en 3 en la pag
    for (let i = 0; i < coches.length; i += 3) {

      //crear un contenedor de fila para cada grupo de 3 coches
      const filaContenedor = document.createElement("DIV")
      filaContenedor.classList.add("row")
  
      for (let j = i; j < i + 3 && j < coches.length; j++) {
        //creamos un contenedor para cada coche
        const contenedorCoche = document.createElement("DIV")
        contenedorCoche.classList.add("col-md-3")
  
        //creamos el card
        const cocheCard = document.createElement("DIV")
        cocheCard.classList.add("card", "mb-4")
  
        //imagen del card
        const cocheImagen = document.createElement("IMG")
        cocheImagen.classList.add("card-img-top")
        cocheImagen.src = coches[j].img
  
        //body del card
        const cocheCardBody = document.createElement("DIV")
        cocheCardBody.classList.add("card-body")

        //titulo
        const cocheHeading = document.createElement("H1")
        cocheHeading.classList.add("card-title", "mb-3")
        cocheHeading.innerHTML = `${coches[j].marca} ${coches[j].modelo} 
            <p>${coches[j].precio} €</p>`

        //datos extra mostrados bajo el título
        const cocheDatosExtra = document.createElement("H3")
        cocheDatosExtra.classList.add("card-title", "mb-3")
        cocheDatosExtra.textContent = `Vehículo ${coches[j].transmision} de ${coches[j].year} con ${coches[j].puertas} puertas en color ${coches[j].color}`
  
        //botón para añadir el coche al carrito
        const cocheButton = document.createElement("BUTTON")
        cocheButton.classList.add("btn", "btn-danger", "w-50")
        cocheButton.textContent = "AÑADIR AL CARRITO"
  
        //botón para solicitar una prueba del vehículo
        const btnSolicitar = document.createElement("BUTTON")
        btnSolicitar.classList.add("btn", "btn-warning", "w-50")
        btnSolicitar.textContent = "SOLICITAR PRUEBA"

        cocheButton.onclick = function() {
            anadirCoche(coches[j].id)
        }

        btnSolicitar.onclick = function() {
            mostrarModal()
        }
        
        //montamos el card
        cocheCardBody.appendChild(cocheHeading)
        cocheCardBody.appendChild(cocheDatosExtra)
        cocheCardBody.appendChild(cocheButton)
        cocheCardBody.appendChild(btnSolicitar)
  
        cocheCard.appendChild(cocheImagen)
        cocheCard.appendChild(cocheCardBody)
  
        contenedorCoche.appendChild(cocheCard)
  
        filaContenedor.appendChild(contenedorCoche)
      }
  
      //agregar la fila al contenedor de resultados del html
      contenedor.appendChild(filaContenedor)
    }
}


function mostrarModal() {
    const modalTitle = document.querySelector(".modal .modal-title")
    const modalBody = document.querySelector(".modal .modal-body")
    const modalFooter = document.querySelector(".modal .modal-footer")

    //limpiar contenido actual del modal
    modalBody.innerHTML = ''
    modalFooter.innerHTML = ''

    //título del modal
    modalTitle.textContent = 'SOLICITA UNA PRUEBA'

    //formulario
    const formulario = document.createElement("form")
    formulario.classList.add("formulario")

    //email
    const emailLabel = document.createElement("label")
    emailLabel.textContent = "EMAIL DE CONTACTO"
    const emailInput = document.createElement("input")
    emailInput.setAttribute("type", "email")
    emailInput.setAttribute("placeholder", "emailContacto@gmail.com")
    emailInput.classList.add("form-control")

    //observaciones
    const observacionesLabel = document.createElement("label")
    observacionesLabel.textContent = "OBSERVACIONES"
    observacionesLabel.classList.add("mt-3")
    const observacionesTextarea = document.createElement("textarea")
    observacionesTextarea.setAttribute("placeholder", "Fecha, hora, detalles adicionales...")
    observacionesTextarea.classList.add("form-control")
    observacionesTextarea.style.height = "100px"

    //boton enviar. Cuando le damos click se muestra un toast de confirmacion y se cierra el modal
    const enviarButton = document.createElement("button")
    enviarButton.setAttribute("type", "button")
    enviarButton.classList.add("btn", "btn-primary", "w-50", "mx-auto", "mt-3")
    enviarButton.textContent = "Enviar"
    enviarButton.onclick = function() {
        mostrarToast("Nos pondremos en contacto con usted a través del correo proporcionado.")
        modal.hide()
    }

    //boton cerrar
    const btnCerrar = document.createElement("button")
    btnCerrar.setAttribute("type", "button")
    btnCerrar.classList.add("btn", "btn-secondary", "w-100")
    btnCerrar.textContent = "Cerrar"
    btnCerrar.onclick = function() {
        modal.hide()
    }

    formulario.appendChild(emailLabel)
    formulario.appendChild(emailInput)
    formulario.appendChild(observacionesLabel)
    formulario.appendChild(observacionesTextarea)
    formulario.appendChild(enviarButton)

    modalBody.appendChild(formulario)

    modalFooter.appendChild(btnCerrar)

    modal.show()
}

function mostrarToast(mensaje) {
    const toastDiv = document.querySelector(".toast")
    const toastDivBody = document.querySelector(".toast-body")
    const toast = new bootstrap.Toast(toastDiv)

    toastDivBody.textContent = mensaje
    toast.show()
  }

//obtiene los valores del localStorage y los añade a la lista. De esta manera conseguimos permanencia de los datos
function obtenerLS() {
    limpiarCarritoHTML()
    const cochesLS = JSON.parse(localStorage.getItem("Coches"))
    if (cochesLS && cochesLS.length > 0) {
        listaCochesCarrito = cochesLS
    }
}

function carritoHTML() { //función que imprime el carrito. Se la llama al principio para que esté siempre impreso desde el principio

    obtenerLS()
    
    listaCochesCarrito.forEach((coche) => {
        const row = document.createElement("tr")

        const {img, marca, precio, modelo, color, id} = coche
        row.innerHTML = `

            <td>
                <img src="${img}" width="100">
            </td>
            <td>${marca} ${modelo}</td>
            <td>${precio}</td>
            <td>${color}</td>
            <td>
                <a href="#" class="borrar-coche" data-id="${id}">X
            </td>
        `
        container.appendChild(row)
    })
}

function anadirCoche(identificador) {

    let objetoCoche

    coches.forEach((coche) => {
        if (coche.id === identificador) {
            objetoCoche = {
                img: coche.img,
                marca: coche.marca,
                modelo: coche.modelo,
                precio: coche.precio,
                color: coche.color,
                id: coche.id
            }
        }
    })

    //verifico si el coche ya está en el carrito
    const cocheEnCarrito = listaCochesCarrito.find(coche => coche.id === objetoCoche.id)

    //si no lo está lo añade a la lista. Esto lo hago porque considero que al ser una compra tan grande, un cliente normal solo puede comprar uno a la vez de un mismo modelo
    if (!cocheEnCarrito) {
        listaCochesCarrito.push(objetoCoche)
    } 

    localStorage.setItem("Coches", JSON.stringify(listaCochesCarrito))

    carritoHTML()
}


function limpiarCarritoHTML() {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function eliminarCoche(e){

    if (e.target.classList.contains("borrar-coche")) {
        const cocheID = e.target.getAttribute("data-id")

        listaCochesCarrito = listaCochesCarrito.filter((coche) => coche.id != parseInt(cocheID))

        localStorage.setItem("Coches", JSON.stringify(listaCochesCarrito))

        carritoHTML()
    }
}
