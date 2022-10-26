
/**
 *      Ruta: /api/usuarios
 *  
 */

 const { Router } = require('express');
 
 const { check } = require('express-validator');
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales');
 
 const { validarCampos } = require('../midlewares/validar-campos');
 const { validarJWT } = require('../midlewares/validar-jwt');
 
 const  router = Router();
 
 router.get('/',getHospitales);
 
 router.post('/',
     [
        validarJWT,
        check('nombre del hospital es necesario').not().isEmpty(),
        validarCampos
     ],
 crearHospitales);
 
 router.put('/:id',
 [ 
 
 ], actualizarHospitales);
 
 router.delete('/:id', borrarHospitales);
 
 const hospitalesRoutes = router;
 module.exports = { hospitalesRoutes };