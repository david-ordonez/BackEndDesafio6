const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const ProductosApi = require('../api/productos');
const MensajesApi = require('../api/mensajes');


const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productosApi = new ProductosApi();
const mensajesApi = new MensajesApi('mensajes.txt');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../public'));

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

io.on('connection',(socket) => {
    console.log('cliente conectado');
    
    socket.emit('listaProductos',productosApi.listarAll());
    socket.on('nuevoProducto', nuevoProducto => {
        productosApi.guardar(nuevoProducto);
        io.sockets.emit('listaProductos', productosApi.listarAll());
    });

    socket.emit('listaMensajes',mensajesApi.listarAll());
    socket.on('nuevoMensaje', async nuevoMensaje => {
        await mensajesApi.guardar(nuevoMensaje);
        io.sockets.emit('listaMensajes', await mensajesApi.listarAll());
    });
});