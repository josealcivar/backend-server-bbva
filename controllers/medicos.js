

const Medico = require('../models/medico');

const getMedicos = async (req, res)=> {

 const desde = Number(req.query.desde) || 0;

        const medicos = await Medico.find()
                    .populate('usuario','nombre img')
                    .populate('hospital','nombre img')
    res.json({
        ok:true,
        medicos
    })
}

const crearMedicos = async (req, res)=> {

    
    const uid = req.uid;

    const medico = new Medico(
        {
            usuario: uid, 
            ...req.body
        }
    );
    
    
    try {
    
        await medico.save();

        res.json({
            ok:true,
            medico
        })

    } catch (error) {
        res.status.json({
            ok:false,
            msg: 'hable con el administrador'
        })
    }
    
}

const actualizarMedicos = (req, res)=> {
    res.json({
        ok:true,
        msg:'actualizar Hospital'
    })
}

const borrarMedicos = (req, res)=> {
    res.json({
        ok:true,
        msg:'borrar Hospital'
    })
}
module.exports = {getMedicos, crearMedicos, actualizarMedicos, borrarMedicos}