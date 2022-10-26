const Usuario = require("../models/usuario");

const Hospital = require("../models/hospital");

const Medico = require("../models/medico");


const getTodo =  async(req, res) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda,'i');

    const [ usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({regex}),
        Hospital.find({regex}),
        Medico.find({regex})
    ])
    

    res.json({
        ok:true,
        msg: 'get todo',
        usuarios, medicos, hospitales
    });
}


const getDocumento =  async(req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');

    let data = [];

    switch(tabla){
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                    .populate('usuario', 'nombre img')
            break;
        case 'usuarios':
                data = await Usuario.find({nombre: regex})
            break;

        default:
            return res.status(400).json({
                ok:false,
                msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
            });
            break;
    }

 

    res.json({
        ok:true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumento
}