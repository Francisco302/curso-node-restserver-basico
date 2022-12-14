const { response, request, json } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    // Verificar email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({
            msg: 'Usuario, password no son correctos - correo'
        })
    }
    // Si el usuario es activo
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario, password no son correctos - estado: false'
        })
    }

    // Verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario, password no son correctos - password'
        })
    }

    // Gemerar json web token

    const token = await generarJWT(usuario.id)


    try {
        res.json({
            msg: 'login ok',
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Hablre con el administradorf"
        })
    }

}

const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                rol: 'USER_ROLE',
                password: ':p',
                img,
                google: true

            }
            usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();
        }

        if (!usuario.estado) {
            res.status(401).json({
                msg: ' Usuario  bloqueado'
            });
        }



        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'login ok - google',
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: `Error `
        })
    }

}



module.exports = {
    login,
    googleSingIn
}