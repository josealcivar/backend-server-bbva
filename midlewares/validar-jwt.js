const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next)=>{
    
    
    const token = req.header('x-token');

    console.log(token);

    if(!token){
        return res.status(401).json({ok:false,msg:'no hay token'});
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        next();    

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'token no valido'
        });
    }

    
}

module.exports = {
    validarJWT
}