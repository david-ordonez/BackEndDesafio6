const socket = io.connect();

const formAgregarProducto = document.getElementById('frmProductos')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault();
    const nuevoProducto = {
        title: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('nuevoProducto', nuevoProducto);
    return false;    
})

socket.on('listaProductos', async listaProductos => {
    const html = await renderListaProductos(listaProductos);
    document.getElementById('listaProductos').innerHTML = html;
});

async function renderListaProductos(productos){
    return fetch('templates/listaProductos.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
        const productosExists = productos.length > 0; 
        const template = Handlebars.compile(plantilla);
        const html = template({ productos, productosExists })
        return html
    });
}

//*********************************************************************/

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault();
    const fecha = new Date();
    const nuevoMensaje = {
        author: inputUsername.value,
        text: inputMensaje.value,
        fecha: `${fecha.toLocaleDateString('es-MX')} ${fecha.toLocaleTimeString('es-MX')}`
    };
    socket.emit('nuevoMensaje', nuevoMensaje);
    return false;
})

inputUsername.addEventListener('change', e => {
        inputMensaje.disabled = !inputUsername.checkValidity();
        btnEnviar.disabled = !inputUsername.checkValidity();
});

socket.on('listaMensajes', async listaMensajes => {
    const html = await renderListaMensajes(listaMensajes);
    document.getElementById('listaMensajes').innerHTML = html;
});

async function renderListaMensajes(mensajes){
    console.log(mensajes);
    return fetch('templates/listaMensajes.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ mensajes })
        return html
    });
}
