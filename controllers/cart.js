require('mongoose');
const Cart = require('../models/cart');
const Game = require('../models/games');
const User = require('../models/user');

const addItem = async (id,name) => {

    let existGame = await Game.findOne({ name: name });
    let existUser = await User.findById({_id:id});

    if(existGame && existUser) {
//        let cart = await Cart.findOne({userId:existUser._id});
//        if(!cart){
            const newCart = new Cart(
                {              
                    userId:existUser._id,
                    items:[{
                        gameId: existGame._id,
                        price: existGame.price
                    }],
                    subtotal: existGame.price
                }
            );
            let cart = await newCart.save(); 
            console.log(cart);
            return { cart }; 
//        }
        
    }else{
        return false;
    }
};

const getCart = async() => {
    
}

module.exports = { addItem }