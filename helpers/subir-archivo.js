
const path = require('path');
const { v4: uuidv4 } = require('uuid');
 

const subirArchivo = (files , extensionesValidas = ['png', ' jpg', ' jpeg', 'gif'], carpeta ='') => {


    return new Promise((resolve, reject) => {


        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        

        if (!extensionesValidas.includes(extension)) {
            return reject(`extension no es permitida ${extension}`);
        }

        const nombreTmp = uuidv4() + '.' + extension;


        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);
        console.log(uploadPath);

        archivo.mv(uploadPath, (err) => {
            if (err) {

                // reject siempre se debe controlar con try o catch
                reject(err);
            }

            resolve(nombreTmp);
        });
    });
}


module.exports = {
    subirArchivo
}