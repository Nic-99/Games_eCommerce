require('mongoose');
const Lib = require('../models/library');
const Game = require('../models/games');
const User = require('../models/user');
const Cart = require('../models/cart');

const addGame = async (id,name) => {

    let existGame = await Game.findOne({ name: name });
    let existUser = await User.findById(id);
    
    if(existGame && existUser){
        const library = await Lib.findOne({userId:existUser._id});
        if(library){
            library.games.push({
                gameId:existGame.id
            });
            return {library};
        }else{
            const newLib = new Lib({              
                    userId:id,
                    games:[{
                        gameId: existGame.id
                    }]
            });
            let lib = await newLib.save(); 
            console.log(lib);
            return { lib };
        }
    }
    return null;
};

const getLib = async(id) => {
    const library = await Lib.findOne({userId:id});
    return library;
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

module.exports = { addGame, getLib }