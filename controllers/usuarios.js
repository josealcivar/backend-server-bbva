
const Usuario = require('../models/usuario');
const response = require('express');
const  bcrypt  = require('bcrypt');

const { generarJWT } = require('../helpers/jwt');
const { dbConnection } = require('../database/config');

var mysql = require('mysql');

const getUsuarios = async(req,res, next)=> {
    const spawn = require('child_process').spawn

    const pythonProcess = spawn('python', ['../main.py'])
    let pythonResponse = ""
    
    pythonProcess.stdout.on('data', function(data) {
        pythonResponse += data.toString()
    })
    
    pythonProcess.stdout.on('end', function() {
        console.log(pythonResponse)
    })
    
    pythonProcess.stdin.write('backendi')
    
    pythonProcess.stdin.end()

    console.log("si ejecutó");
    res.status(200).json({
        ok:true,
        //usuarios,
        result:"si pasó",
        pythonResponse
        
 
    });
   
};

const createUsuarios =  async(req, res) =>{
    const {nombre, email, password}=req.body;
    


    console.log(req.body);


    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:true,
                msj:'El email ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);
        
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password,salt);
        
        // guardar usuario
        await usuario.save()
    

        // generar un token 
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok:true,
            usuarios:[{
                msg:"usuario creado",
                result: usuario,
                token
            }]
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:true,
            msj:'error inesperado revisar el log'
        })
    }
   
};



/**
 * 
 *  actualizar usuario
 */


const actualizarUsuario = async(req, res) => {
    const {nombre, email, id}=req.body;
    
    const uid = req.parms.id;

    console.log(req.body);


    try {
        const usuarioDB = await Usuario.findById(uid);
      
        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                    msg:"usuario no encontrado",
            });
        }

        // Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne(email);
            if(existeEmail){
                return res.status(400).json({
                    ok:true,
                    msj:'Ya existe un usuario con es email'
                });
            }
        }

        // delete campos.password;
        // delete campos.google;
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});
    
        
        res.status(200).json({
            ok:true,
            usuarioActualizado
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:true,
            msj:'error inesperado revisar el log'
        })
    }
   
}


/**
 * 
 *  borra un Usuario
 * 
 */

const borrarUsuario = async(req,res)=>{
    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById(uid);
      
        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                    msg:"usuario no encontrado",
            });
        }


        // aqui va la parte de eliminar o desactivar el usuario
        res.status(200).json({ok:true,uid});
            
    } catch (error) {
    
        res.status(500).json({
            ok:true,
            uid
            })
    }

    
}


module.exports = {getUsuarios,createUsuarios,actualizarUsuario,borrarUsuario};