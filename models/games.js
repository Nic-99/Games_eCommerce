const { interfaces } = require('mocha');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({

	name:{
		type: String,
		required:true
    },
    autor:{
		type: String,
		required:true
	},
	precio:{
		type: Number,
		required:true
	},
	descripcion:{
		type: String,
		required:true
	},
	categoria:{
		type: Array,
		required:true,
		default: ['single_player']
	},
	isActive:{
		type: Boolean,
		required:true
	}
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});


const Game = mongoose.model('game',gameSchema);
module.exports = Game;