const { response, request } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    // Desetructuracion de arreglos
    const [total, usuarios] = await Promise.all([ 
        Usuario.countDocuments(),
        Usuario.find({estado: true})
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    
        res.json({
        total,
        usuarios
    })
}
const usuariosPost = async (req, res = response) => {


    const{nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre,correo, password, rol} );

    // Encriptar contrasena 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar en DB
    await usuario.save()
        
    res.json({
        
        msg: 'post Api - controller',
        usuario
    })
}
const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const {_id, password, google,correo, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put Api - controller',
        usuario
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - controller'
    })
}
const usuariosDelete = async (req, res = response) => {
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    res.json({
        msg: 'delete Api - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}