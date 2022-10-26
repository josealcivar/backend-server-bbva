

const Hospital = require('../models/hospital');

const getHospitales = async (req, res)=> {

    const hospitales = await Hospital.find().populate('usuario','nombre ')

    res.json({
        ok:true,
        hospitales
    })
}

const crearHospitales = async (req, res)=> {

    
    const uid = req.uid;

    const hospital = new Hospital(
        {
            usuario: uid, 
            ...req.body
        }
    );
    
    
    try {
    
        await hospital.save();

        res.json({
            ok:true,
            hospital
        })

    } catch (error) {
        res.status.json({
            ok:false,
            msg: 'hable con el administrador'
        })
    }
    
}

const actualizarHospitales = (req, res)=> {
    res.json({
        ok:true,
        msg:'actualizar Hospital'
    })
}

const borrarHospitales = (req, res)=> {
    res.json({
        ok:true,
        msg:'borrar Hospital'
    })
}
module.exports = {getHospitales, crearHospitales, actualizarHospitales, borrarHospitales}