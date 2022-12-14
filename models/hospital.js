
const { Schema, model} = require('mongoose');



const HospitalSchema = Schema({
    nombre: {
        type: String,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true

    },
    img:{
        type: String,
    }
}, {collection: 'hospitales'});



HospitalSchema.method('toJSON', function(){
    const { __v,  ...object} = this.toObject();
    // object.uid = _id;
    return object;
});

module.exports = model('Hospital', HospitalSchema )