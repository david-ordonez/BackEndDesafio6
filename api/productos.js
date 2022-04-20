class ProductosApi {
    constructor() {
        this.productos = []
        this.id = 0
    }

    listar(id) {
        return this.productos.find(item => item.id === id);
    }

    listarAll() {
        return this.productos;
    }

    guardar(prod) {
        const nuevoId = this.productos.length + 1;
        const nuevoProducto = {...prod, id : nuevoId};
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    actualizar(prod, id) {
        const producto = this.listar(id)
        producto.title = prod.title;
        producto.price = parseFloat(prod.price);
        producto.thumbnail = prod.thumbnail;

        return producto;
    }

    borrar(id) {
        this.productos = this.productos.filter(element => element.id !== id);
        return this.productos;
    }
}

module.exports = ProductosApi;
