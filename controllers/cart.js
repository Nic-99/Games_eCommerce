require('mongoose');
const Cart = require('../models/cart');
const Game = require('../models/games');
const User = require('../models/user');

const addItem = async (id,name) => {

    let existGame = await Game.findOne({ name: name });
    let existUser = await User.findById(id);

    const carts = await Cart.findOne({userId:existUser._id});
    
    if(existGame && existUser){
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
        carts[0].items.push({
            gameId:existGame.id,
            price:existGame.price
        });
        carts[0].subtotal = carts[0].subtotal + existGame.price;
        return carts[0];
    }
    return null;
};

const getCart = async(id) => {
    const cart = await Cart.findOne({userId:id});
    return cart;
};

const removeItem = async(id,name) => {
    const cart = await Cart.findOne({userId:id});
    if(cart){
        const game = await Game.findOne({ name: name });
        if(game){
            const index = cart.items.findIndex(item => item.gameId == game.id);
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            }else{
                cart.subTotal = cart.subTotal - game.price;
            }
            return {cart};
        }
    }
    return null;
}

module.exports = { addItem, getCart, removeItem }