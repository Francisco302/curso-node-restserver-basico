const Role = require('../models/role');
const Usuario = require('../models/usuario');


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


module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuarioPorId
}