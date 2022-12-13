const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') =>{
    return new Promise(( resolve, reject ) => {
        // Los JWT se pueden abrir por lo que no se debe guardar informaci[on comprometedora 

        const payload = { uid };
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve( token );
            }
        })
    })
}

module.exports = {
    generarJWT
}