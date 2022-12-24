const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const { ObjectId } = require('mongoose').Types;


const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    // Expresion regular
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    })
}

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const categoria = await Producto.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    // Expresion regular
    const regex = new RegExp(termino, 'i');

    const categorias = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: categorias
    })
}


const buscarProducto = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    // Expresion regular
    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    }).populate('categoria','nombre');
    res.json({
        results: producto
    })
}


const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colleciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res);
            break;

        case 'categoria':
            buscarCategoria(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'No existe busqueda para esta consulta'
            })
    }

}

module.exports = buscar;