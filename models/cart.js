const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({

	gameId:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Game',
		required:true
    },
	price:{
		type: Number,
		required:true
	}

}, { timestamps: true })

const cartSchema = new Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	items: [itemSchema],
	subTotal:{
		default: 0,
		type: Number
	}
},
{ timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});


const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;