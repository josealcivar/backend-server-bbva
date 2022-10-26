/**
 * 
 * *ruta : api/todo
 */


// Get Todo

const { Router } = require('express');
const { getTodo, getDocumento  } = require('../controllers/busquedas');
const { validarJWT } = require('../midlewares/validar-jwt');

const router = Router();
 


router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumento);

const busquedasRoutes = router;
module.exports = { busquedasRoutes };