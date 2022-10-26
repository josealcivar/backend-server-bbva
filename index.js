
const express = require('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');
const { router } = require('./routes/usuarios');
const { authRoutes } = require('./routes/auth');
const { hospitalesRoutes } = require('./routes/hospitales');
const { medicosRoutes } = require('./routes/medicos');
const { busquedasRoutes } = require('./routes/busquedas');
const { uploadsRoutes } = require('./routes/uploads');
const app = express();


app.use(cors());

// lectura y parseo del body
app.use(express.json());

// database

//dbConnection();

// rutas
app.use('/api/usuarios', router);
app.use('/api/hospitales', hospitalesRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/login', authRoutes);
app.use('/api/todo', busquedasRoutes);
app.use('/api/upload', uploadsRoutes);

// app.get('/api/usuarios',(req,res)=> {
//     res.status(200).json({
//         ok:true,
//         usuarios:[{
//             id:123,
//             msg:"hola mundo"
//         }
//         ]
//     });
// });

// app.listen(process.env.PORT , () => {
    app.listen(3001,() =>{ 
    // console.log(`server on run: ${process.env.PORT}` || 3002);
    console.log('server on run', 3001);
});