const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const OrdSchema = new mongoose.Schema( 
{
    
/*     ordNum: {
        type: Number,
        required:true,
        index: {unique: true, dropDups: true}

    }, */
    
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    date:{
        type:Date,
        required:true,
        default: Date.now

    },
    //ACA DEBO VOLCAR EL CONTENIDO DEL CARRO DE COMPRAS
    detail: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Cart',
        type:[],
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    street:{
        type: String,
        requiered: true,
        max: 255
    },
    isConfirmed:{
        type: Boolean,
        default: false

    },
        
}).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.id;
    }
});

const Order = mongoose.model('order',OrdSchema);
module.exports = Order;