
/**
 * *     Ruta: /api/login
 *  
 */

 const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth'); 
const { validarCampos } = require('../midlewares/validar-campos');

 const  router = Router();
 
 const authRoutes = router.post('/',
 [
    check('email', 'rl email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
 ],
 login
 );



 module.exports = { authRoutes };