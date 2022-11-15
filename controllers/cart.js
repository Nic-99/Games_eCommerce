require('mongoose');
const Cart = require('../models/cart');
const Game = require('../models/games');
const User = require('../models/user');

const addItem = async (id,name) => {

    let existGame = await Game.findOne({ name: name });
    if(existGame){
        let subTotal = existGame.price;
        let existUser = await User.findById(id);

        if(existUser){

            const carts = await Cart.findOne({userId:existUser._id});
            if(carts){
                if(!carts.items.some(item => item.gameId == existGame.id)) {
                    carts.items.push({
                        gameId:existGame.id,
                        price:existGame.price
                    });
                    carts.subTotal += subTotal;
    
                    const result = await Cart.findByIdAndUpdate(carts._id,carts,{new:true});
                    return result;
                }
            }else{                
                const newCart = new Cart(
                    {              
                        userId:id,
                        items:[{
                            gameId: existGame.id,
                            price: existGame.price
                        }],
                        subTotal: subTotal
                    }
                );
                let cart = await newCart.save(); 
                console.log(cart);
                return { cart };
            }
        }       
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
            cart.items.splice(index, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            }else{
                cart.subTotal = cart.subTotal - game.price;
            }
            const result = await Cart.findByIdAndUpdate(cart._id,cart,{new:true});
            return result;
        }
    }
    return null;
}

module.exports = { addItem, getCart, removeItem }