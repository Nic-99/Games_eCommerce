require('mongoose');
const Ord = require('../models/order.js');
const User = require('../models/user.js');
const Game = require('../models/games.js');
const Cart = require('../models/cart.js');

const addOrder = async(userId,street) =>{
    let existUser = await User.findById(userId);
    console.log("hay usuario");
    const cart = await Cart.findOne({userId:existUser._id});
    if(cart){
        console.log("hay cart");
        const order = new Ord({
            customerId: cart.userId,
            date: new Date().toISOString().slice(0, 10),
            detail:cart.items,
            total:cart.subTotal,
            street:street,
            isConfirmed:true
        })
        console.log("order armada");

        let newOrd = await order.save();
        console.log("done");
        return { newOrd }; 
    }
    else{
        return null;
    };
};


const getOrder = async(Id) => {
    const order = await Ord.findById(Id);
    return order;
};

const getAllOrders = async(limit,offset) =>{
    const results = await Ord.find({}).limit(limit).skip(offset);
    return results;
};

const editOrder = async(order) =>{
    const result = await Ord.findByIdAndUpdate(order.id,order,{new:true});
    return result;
};

const deleteOrder = async(id) =>{
    const result = await Ord.findByIdAndDelete(id);
    return result;
};

module.exports = {getAllOrders, getOrder, deleteOrder, editOrder, addOrder};