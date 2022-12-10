const { response, request } = require("express")



const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get Api - controller',
        query
    })
}
const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
        
    res.json({
        
        msg: 'post Api - controller',
        edad
    })
}
const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put Api - controller',
        id
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - controller'
    })
}
const usuariosDelete = (req, res = response) => {
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