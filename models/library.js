const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libSchema = new Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true,
		index: {unique: true, dropDups: true}
	},
	games:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Game',
        required:true
    }
},
{ timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});


const Lib = mongoose.model('lib',libSchema);
module.exports = Lib;