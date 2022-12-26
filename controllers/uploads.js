const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const fs = require('fs');
const path = require('path');
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);


const cargarArchivo = async (req = request, res = response) => {

    let pathCompleto;
    try {
        // pathCompleto = await subirArchivo(req.files,['pdf'],'docs');
        pathCompleto = await subirArchivo(req.files, undefined, 'imgs');
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    res.json({
        nombre: pathCompleto
    })

}

const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    console.log(coleccion);
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                console.log(modelo);
                return res.status(400).json({
                    msg: `No existe un usuario con el id  de ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(400).json({
                msg: `No se encunetra la opcion para la coleccion ${coleccion}`
            });
            break;

    }

    // Limpiar antiguas imagenes
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    })
}
const actualizarImagenCloudinary = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    console.log(coleccion);
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                console.log(modelo);
                return res.status(400).json({
                    msg: `No existe un usuario con el id  de ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(400).json({
                msg: `No se encunetra la opcion para la coleccion ${coleccion}`
            });
            break;

    }

    // Limpiar antiguas imagenes
     if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1 ];
        const [public_id ] = nombre.split('.');
        // console.log(public_id);
        cloudinary.uploader.destroy(public_id);
     }
 
     const { tempFilePath } = req.files.archivo;
     const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
 
     modelo.img = secure_url;
     await modelo.save();
 
    res.json(modelo);
}

const mostrarImagen = async(req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    console.log(coleccion);
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                console.log(modelo);
                return res.status(400).json({
                    msg: `No existe un usuario con el id  de ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(400).json({
                msg: `No se encunetra la opcion para la coleccion ${coleccion}`
            });
            break;

    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }else{
        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(pathImagen);
    }


    res.json({
    msg: 'Falta placeholder'
    });
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}