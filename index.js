const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

/******/
const UsrController = require('./controllers/user');
const AuthController = require('./controllers/auth');
const Middleware = require('./middleware/auth-middleware');
const GamesController = require('./controllers/games');


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());

// GET - POST - DELETE - PUT - PATCH 

app.get("/", (req, res) => {
  res.send("Hola estoy funcionando.");
});
app.post("/",(req,res) => {
    res.send("Llamada post");
});

// Get de todos los usuarios
app.get("/users",/*Middleware.verify,*/async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});

// Get Info de un usuario
app.get("/users/:id",async (req,res) =>{

    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo usuario
app.post("/users",async (req,res) =>{
    
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    try{
      const result = await UsrController.addUser(name,lastname,email,isActive,password);
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el usuario."); //500
    }  
    
});

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

    const user = { _id: req.params.id, ...req.body };
    //             {_id: req.params.id, name: req.body.name, lastname, email }
    try{
      
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 

});

// Elimino un usuario
app.delete("/users/:id", async(req,res) =>{

    try{

      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  

    }catch(error){
      res.status(500).send("Error")
    }
});

// Edito roldes del usuario
app.put("/users/:id/roles",async (req,res) =>{
    
    const roles = req.body.roles;
    try{
      
      const result = await UsrController.editRoles(roles,req.params.id);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 
})

// TODO --> Copia del edit roles para isActive
app.put("/users/:id/isActive",async (req,res) =>{
    
  const isActive = req.body.isActive;
  try{
    const result = await UsrController.editActive(isActive,req.params.id);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El usuario no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
  } 
})

// --------------------------------------------------------------------

// Get de todos los juegos
app.get("/games",/*Middleware.verify,*/async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await GamesController.getAllGames(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});

// Get Info de un juego
app.get("/games/:id",async (req,res) =>{

    let gameId =  req.params.id;

    try{

      game = await GamesController.getGame(gameId);

      res.status(200).json(game);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo juego
app.post("/games",async (req,res) =>{
    
    let name = req.body.name;
    let autor = req.body.autor;
    let isActive = req.body.isActive;

    try{
      const result = await GamesController.addGame(name,autor,isActive);
      if(result){
        res.status(201).send("Juego creado correctamente"); // 201
      }else{
        res.status(409).send("El juego ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el juego."); //500
    }  
    
});

// Modifico un juego
app.put("/games/:id",async (req,res) =>{

    const game = { _id: req.params.id, ...req.body };
    //             {_id: req.params.id, name: req.body.name, lastname, email }
    try{
      
      const result = await GamesController.editGame(game);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 

});

// Elimino un juego
app.delete("/games/:id", async(req,res) =>{

    try{
      const result = await GamesController.deleteGame(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  

    }catch(error){
      res.status(500).send("Error")
    }
});

// Edito si esta activo el juego
app.put("/games/:id/isActive",async (req,res) =>{
    
    const isActive = req.body.isActive;
    try{
      const result = await GamesController.editActive(isActive,req.params.id);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El juego no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 
});

// --------------------------------------------------------------------

app.post("/auth/login", async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    try{
      const result = await AuthController.login(email,password);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(401).send("No puede estar aqui")
      }
    }catch(error){
        res.status(500).send("Error");
    }  
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
