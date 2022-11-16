require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({ email: email, isActive:true, password:cryptoPass })
    //console.log(result);
    /* 
    if (result){
        if(['user'] == result.roles){
            return token = jwt.sign({id: result._id, admin: false },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
        }if(['admin'] == result.roles){
            token = jwt.sign({id: result._id, admin:true },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
            console.log(token)
            return token
        }
        token = jwt.sign(
            {id: result._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        console.log(token)
        return token
    } 
    */
   try{
    let token = ({id: result._id,
        token: jwt.sign({id: result._id, admin: false },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
    });
    return token;
   }catch(error){
    console.log(error)
   }

}

module.exports = {login}