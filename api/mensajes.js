const fs = require('fs');
const fm = require('../src/util/filemanager');

class MensajesApi {
    constructor(fileName) {
        this._fileName = fileName;
    }

    async listarAll() {
        try {
            const mensajes = await fm.readFile(this._fileName);
            return mensajes;       
        } catch (error) {
            throw error;
        }
    }

    async guardar(nuevoMensaje) {
        try {
            const mensajes = await fm.readFile(this._fileName);
            mensajes.push(nuevoMensaje);            
            await fm.saveFile(this._fileName,JSON.stringify(mensajes,null,2));
        } catch (error) {
            console.log(error);
        }
    }

    async borrarTodo() {
        try {
            const data = await fs.promises.writeFile(this._fileName, '');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MensajesApi;