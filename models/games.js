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