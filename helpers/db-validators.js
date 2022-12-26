const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
var mongoose = require('mongoose');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base`);
    }
}


const esEmailValido = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado en la base`);
    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario){
        throw new Error(`El id ${id} ya no existe`);
    }
}
const existeCategoriaById = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);
    //console.log(`id validator ${id}`);
    if( !existeCategoria){
        throw new Error(`El id ${id} ya no existe`);
    }
}

const esIdValido = async (id = '') => {
    //;
    if(!mongoose.Types.isValid(id)){
        throw new Error(`El id ${id} ya no existe`);
    }
}


const coleccionesPermitidas = (coleccion = '', colecciones = '') => {
    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`la coleccion ${coleccion} no es permitida`);
    }
    return true;
}



module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaById,
    coleccionesPermitidas
}