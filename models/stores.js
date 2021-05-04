const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    place:{
        type:String,
        require:true
    },
    geometry:{
        coordinates:{type:[Number],index:'2dsphere'}
    },
    products:{
        dairy:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ],
        vegetables:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ]
    }
})

module.exports = mongoose.model('Store',storeSchema);