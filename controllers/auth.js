require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, isActive:true, password:cryptoPass })
    console.log(result.roles);
    if (result){
        if(result.roles == 'user'){
            return token = jwt.sign({id: result._id, admin: false },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
        }if(result.roles == 'admin'){
            return token = jwt.sign({id: result._id, admin:true },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
        }
    }return null;

}

module.exports = {login}