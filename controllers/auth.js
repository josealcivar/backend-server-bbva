
const  bcrypt  = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const login = async (req,res)=>{

    const { email, password } = req.body;


    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'usuario y contraseña no existe'
            })
        }

        const validPassword=bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'password no valida'
            });
        }


        // generar un token 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"hable con administrador"
        })
    }
};



module.exports = {login};