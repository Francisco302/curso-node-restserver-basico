
require('dotenv').config()
const express = require('express');
const cors = require("cors");
const fileUpload = require("express-fileupload");

const dbConnection = require('../database/config.db');
class Server {

    constructor() {
        this.app = express() // no es necesario const ya  que esta definido en el constructor
        this.port = process.env.PORT || 5000

        this.paths = {

            usuarios : '/api/usuarios',
            auth : '/api/auth',
            categorias : '/api/categorias',
            productos : '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
        

        // connexion a base de datos
        this.conectarDB();
        //Middlewars
        this.middlewares();

        // Rutas de app
        this.routes();



    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors())

        // Parseo o letura de json
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))

        // Manejar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        })


    }
}

module.exports = Server;