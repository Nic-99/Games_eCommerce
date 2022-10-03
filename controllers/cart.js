require('mongoose');
const Cart = require('../models/cart');
const Game = require('../models/games');
const User = require('../models/user');

const addItem = async (id,name) => {

    let existGame = await Game.findOne({ name: name });
    let existUser = await User.findById(id);

    const carts = await Cart.findOne({userId:existUser._id});
    //if(existGame && existUser){
        if(!carts[0]){
            const newCart = new Cart(
                {              
                    userId:id,
                    items:[{
                        gameId: existGame.id,
                        price: existGame.price
                    }],
                    subtotal: existGame.price
                }
            );
            let cart = await newCart.save(); 
            console.log(cart);
            return { cart };
        }
    //}
};

const getCart = async(id) => {
    const cart = await Cart.findOne({userId:id});
    return cart;
}

module.exports = { addItem, getCart }