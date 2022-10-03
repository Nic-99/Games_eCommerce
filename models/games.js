const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({

	name:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
    },
    author:{
		type: String,
		required:true
	},
	price:{
		type: Number,
		required:true
	},
	description:{
		type: String,
		required:true
	},
	category:{
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