
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req, res) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un médico, usuario u hospital (tipo)'
        });
    }

    // validar que exista un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).
        json({
            ok:false,
            msg:'no hay ningun archivo'
        });
    }


    // procesar una imagen.
    const file = req.files.imagen;
    console.log(file);
    const nombreCortado= file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1];

    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).
        json({
            ok:false,
            msg:'no es una extensión permitida'
        });
    }

    const nombreArchivo = `${ uuidv4()}.${extensionArchivo}`;

    //Path
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err)=> {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'error al mover la imagen'
            });
        }
        
        res.json({
            ok:true,
            msg:'archivo subido',
            nombreArchivo
        });
    });
    

}


module.exports = {fileUpload};