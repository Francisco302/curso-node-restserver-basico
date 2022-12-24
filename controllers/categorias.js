const { request, response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
// obtenerCategoria - populate {}


// TODO
const obtenerCategorias = async (req = request, res = response) => {
    const inicio = req.headers.inicio
    const cantidad = req.headers.cantidad;
    const [total, categorias] = await Promise.all([ 
        Categoria.find({estado: true})
        .limit(Number(cantidad))
        .skip(Number(inicio)).countDocuments(),
        Categoria.find({estado: true})
        .populate('usuario','nombre')
        .limit(Number(cantidad))
        .skip(Number(inicio))
    ])
    
  res.json({
    total,
    categorias
  });
}

const obtenerCategoria = async (req = request, res = response) => {
    const id = req.params.id
    const categoria = await Categoria.findById(id).populate('usuario');
    
    res.json(categoria);
}

const crearCategoria = async (req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    
    if( categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    
    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    console.log('prueba');
    const categoria = await  Categoria(data);
    await categoria.save();
    
    res.status(201).json(categoria)
    
}

// actualizarCategoria  - nombre ver q no exista

const actualizarCategoria = async(req = request, res = response ) => {
    const id = req.params.id;
    const {nombre} = req.body;
    const categoria = await Categoria.findByIdAndUpdate(id, {nombre});
    console.log(nombre);
    res.status(200).json({
        msg: 'Put  categoria',
        categoria
    })
}

// borrar categoria, estado a false
const eliminarCategoria = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado: false});
    res.json({
        msg: 'Delete  categoria',
        categoria
    })
}


module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}