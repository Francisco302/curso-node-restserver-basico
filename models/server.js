
require('dotenv').config()
const express = require('express');
const cors = require("cors");
class Server {

    constructor() {
        this.app = express() // no es necesario const ya  que esta definido en el constructor
        this.port = process.env.PORT || 5000
        this.usuariosPath = '/api/usuarios';
        
        //Middlewars
        this.middlewares();
        // Rutas de app
        this.routes();



    }

    middlewares(){
        this.app.use(cors())

        // Parseo o letura de json
        this.app.use(express.json())
        
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        })

    }
}

module.exports = Server;