const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, getCategoriaById, obtenerCategoria, obtenerCategorias, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { crearProducto, obtenerProductos, actualizarProducto } = require('../controllers/producto');
const { existeCategoriaById, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos, validarJWT, tieneRole } = require('../middlewares/index');

const router = Router();
router.get('/',[
    
],obtenerProductos);

//Get todos
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaById),
    validarCampos
],  (req,res) => {
    res.json('Get')
});

// Crear categoria por cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo valido').isMongoId(),
    check('categoria').custom( existeCategoriaById),
    validarCampos 
], crearProducto)

// Actualizar cualquiera con un token valido
router.put('/:id',[
    validarJWT,
    check('nombre').not().isEmpty(),
    validarCampos
], actualizarProducto)

/*
// Borrar solo el admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id').custom( existeCategoriaById),
    validarCampos
],eliminarCategoria)
*/
// Va recorriendo el array de middlewars para ejcutr el post

module.exports = router;