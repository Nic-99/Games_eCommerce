require('mongoose');
const Game = require('../models/games');

const addGame = async (name,author,price,description,category,isActive) => {

    let existGame = await Game.findOne({ name: name });
    console.log(existGame);
    if(!existGame) {
        let data = {              
            name: name,
            author:author,
            price:price,
            description:description,
            category:category,
            isActive:isActive
        }
        var newGame = new Game(data);
        let game = await newGame.save(); 
        console.log("juego nuevo");
        console.log(game);
        return { game }; 
    }else{
        return false;
    }
}   

const getAllGames = async (limit,offset) => {

    const games = await Game.find({}).limit(limit).skip(offset);
    return games;
}

const getGame = async(id) => {

    const user = await Game.findById(id);
    return user;
}

const editGame = async(game) => {

    const result = await Game.findByIdAndUpdate(game._id,game,{new:true});
    return result;
}

const editActive = async(isActive,id) => {

    const result = await Game.findByIdAndUpdate(id,{$set:{isActive:isActive}},{new:true});
    return result;
}

const deleteGame = async(id) => {

    const result = await Game.findByIdAndDelete(id);
    return result;
}

module.exports = { addGame, getAllGames, getGame, editGame, editActive, deleteGame }