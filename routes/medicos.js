
/**
 *      Ruta: /api/usuarios
 *  
 */

 const { Router } = require('express');
 
 const { check } = require('express-validator');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/Medicos');
 
 const { validarCampos } = require('../midlewares/validar-campos');
 const { validarJWT } = require('../midlewares/validar-jwt');
 
 const  router = Router();
 
 router.get('/',getMedicos);
 
 router.post('/',
     [
        validarJWT,
        check('nombre','nombre del medico es necesario').not().isEmpty(),
        check('hospital','hospital id debe ser valido').isMongoId(),
        validarCampos 
     ],
 crearMedicos);
 
 router.put('/:id',
 [ 
 
 ], actualizarMedicos);
 
 router.delete('/:id', borrarMedicos);
 
 const medicosRoutes = router;
 module.exports = { medicosRoutes };