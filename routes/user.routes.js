const {Router} = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');



const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)

// Va recorriendo el array de middlewars para ejcutr el post
router.post('/', [
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}),
   //check('correo', 'El correo no es valido').isEmail(),
   check('correo').custom(esEmailValido),
   //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']
   check('rol').custom(esRolValido),
   validarCampos
], usuariosPost)
router.put('/:id',[
    check('id', 'No es un id valdio').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/:id', usuariosDelete)

module.exports = router;