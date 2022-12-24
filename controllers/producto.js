const { request, response } = require("express");
const { Producto } = require("../models");





const  crearProducto = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion | '';
    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ya existe`
        })
    }

    const data = {
        nombre,
        categoria,
        descripcion,
        usuario: req.usuario._id
    }

    const producto = await Producto(data);
    await producto.save();

    res.status(200).json(
        producto
    )
}


const obtenerProductos = async (req = request, res = response) => {
    //const {inicio = 0 , cantidad = 10 } =  req.headers;
    const inicio = req.headers.inicio | 0;
    const cantidad = req.headers.cantidad | 10;

    console.log(inicio);

    // Promesa permite hacer dos consultas en paralelo
    const [total, productos] = await Promise.all([
        Producto.find({estado: true})
        .limit(Number(cantidad))
        .skip(Number(inicio))
        .countDocuments(),

        Producto.find({estado: true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .limit(Number(cantidad))
        .skip(Number(inicio))
        
    ])

    res.json({
        total,
        productos
    })

}

const  actualizarProducto = async(req = request, res = response) => {

    const id = req.params.id;


    let {nombre,categoria, precio, disponible, descripcion, ...loDemas} =req.body.descripcion;
    nombre = nombre.toUpperCase();
    const productoDB = await Producto.findOneAndUpdate(id,{nombre,categoria, precio, disponible, descripcion});

    res.status(200).json(
        {
            msg: 'Producto actualizado',
            productoDB
        }
    )
}


module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto
}