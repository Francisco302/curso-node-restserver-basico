const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) =>{
    if(!req.usuario){
        res.status(500).json({
            meg: 'Se  quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre} = req.usuario;
    console.log(rol);
    if(rol !== 'ADMIN_ROLE'){
        res.status('401').json({
            msg: `${nombre} no es Adminsitrador`
        })
    }
    next();
}

const tieneRole = ( ...roles ) =>{
    return (req = request, res = response, next) => {
        //console.log(roles, req.usuario.rol);
        if(!req.usuario){
            res.status(500).json({
                meg: 'Se  quiere verificar el role sin validar el token primero'
            })
        }
    
        if ( !roles.includes(req.usuario.rol )) {
            res.status('401').json({
                msg: `Requiere uno de esto roles ${roles}.`
            })
        }
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}
