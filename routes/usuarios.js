
/**
 *      Ruta: /api/usuarios
 *  
 */

const { Router } = require('express');
const { getUsuarios, createUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');

const { validarCampos } = require('../midlewares/validar-campos');
const { validarJWT } = require('../midlewares/validar-jwt');

const  router = Router();

router.get('/',getUsuarios);

router.post('/',
    [
        check('nombre','EL nombre es obligatorio').not().isEmpty(),
        check('password','el password es obligatorio').not().isEmpty(),
        check('email','el email es oblogatorio').isEmail(),
        validarCampos,
    ],
createUsuarios);

router.put('/:id',
[ 
    validarJWT,
check('nombre','EL nombre es obligatorio').not().isEmpty(),
check('role','el rol es obligatorio').not().isEmpty(),
check('email','el email es oblogatorio').isEmail(),
validarCampos,
], actualizarUsuario);

router.delete('/:id', validarJWT,borrarUsuario);


module.exports = { router };