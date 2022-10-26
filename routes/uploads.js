/**
 * 
 * *ruta : api/todo
 */


// Get Todo

const { Router } = require('express');

const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/uploads');



const { validarJWT } = require('../midlewares/validar-jwt');

const router = Router();
 
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);


const uploadsRoutes = router;
module.exports = { uploadsRoutes };