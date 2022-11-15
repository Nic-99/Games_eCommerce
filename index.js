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
const CartController = require('./controllers/cart');
const OrderController = require('./controllers/order.js');


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());


http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});


app.get("/", (req, res) => {
  res.send("Hola estoy funcionando.");
});
app.post("/",(req,res) => {
    res.send("Llamada post");
});

// --------------------------------------------------------------------\

app.post("/login", async (req,res) => {

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
});

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS USER
//-------------------------------------------------------------------------------------------------------

// Get de todos los usuarios
app.get("/users",/* Middleware.verify, */async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;
  
  //console.log(decode.roles);

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});

// Get Info de un usuario
app.get("/users/:id",/* Middleware.verify, */async (req,res) =>{

    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo usuario
app.post("/users",/* Middleware.verify, */async (req,res) =>{
    
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
app.put("/users/:id",/* Middleware.verify, */async (req,res) =>{

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
app.delete("/users/:id",/* Middleware.verify, */async(req,res) =>{

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
app.put("/users/:id/roles",/* Middleware.verify, */async (req,res) =>{
    
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
app.put("/users/:id/isActive",/* Middleware.verify, */async (req,res) =>{
    
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

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS GAMES
//-------------------------------------------------------------------------------------------------------

// Get de todos los juegos
app.get("/catalogo",async (req,res) =>{

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
app.get("/catalogo/:id",async (req,res) =>{

    let gameId =  req.params.id;

    try{

      game = await GamesController.getGame(gameId);

      res.status(200).json(game);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo juego
app.post("/catalogo",/* Middleware.verify, */async (req,res) =>{
    
    let name = req.body.name;
    let author = req.body.author;
    let price = req.body.price;
    let description = req.body.description;
    let category = req.body.category;
    let isActive = req.body.isActive;

    try{
      const result = await GamesController.addGame(name,author,price,description,category,isActive);
      console.log("Result:" + result)
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
app.put("/catalogo/:id",/* Middleware.verify, */async (req,res) =>{

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
app.delete("/catalogo/:id",/* Middleware.verify, */async(req,res) =>{

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
app.put("/catalogo/:id/isActive",async (req,res) =>{
    
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


//-------------------------------------------------------------------------------------------------------
// ENDPOINTS CART
//-------------------------------------------------------------------------------------------------------

// Agregar juego a carrito
app.post("/catalogo/cart/:id",/* Middleware.verify, */ async (req,res) => {
  let userId = req.params.id;
  let gameName = req.body.gameName;

  try{
    const result = await CartController.addItem(userId, gameName);
    if(result){
      res.status(201).send("Juego se a agregado correctamente"); // 201
    }else{
      res.status(409).send("El juego ya esta agregado"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al agregar el juego."); //500
  }  

});

// Obtener el carrito del ususario
app.get("/catalogo/cart/:id",/* Middleware.verify, */ async(req,res) =>{
  let userId = req.params.id;
  try{
    const result = await CartController.getCart(userId);
    res.status(200).json(result);
  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }
});

// Remover item del carrito
app.delete("/catalogo/cart/:id",/* Middleware.verify, */ async(req,res) => {

  try{
    const result = await CartController.removeItem(req.params.id,req.body.gameName);
    if(result){
      res.status(200).send("Item removido");
    }else{
      res.status(404).send("No se ha podido remover el item.");
    }  

  }catch(error){
    res.status(500).send("Error");
  }
});


//-------------------------------------------------------------------------------------------------------
// ENDPOINTS ORDER
//-------------------------------------------------------------------------------------------------------

app.get("/orders/", async(req,res)=>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await OrderController.getAllOrders(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.");
  }

});

app.get("/orders/:id", async(req,res) => {
  
  let ordId = req.params.id;
  try{

  const order = await OrderController.getOrder(ordId);

  res.status(200).json(order);
  
}catch(error){

  res.status(500).send("Error.Intente mas tarde.")  
}
});


app.post("/orders/:id", async(req,res)=>{

  let userId= req.params.id;
  let street = req.body.street;
  try{
    const result = await OrderController.addOrder(userId,detail,street,isConfirmed);

    if ( result){
      res.status(200).send("Orden Creada correctamente") //http 200
    }
    else
    {
      res.status(400).send("La orden ya existe") // http 400
    }
  }catch(error){
    res.status(500).send("Error.Intente mas tarde") // http 500
  }
});


app.delete("/orders/:id", async(req,res)=>{

  try{
    const result = await OrderController.deleteOrder(req.params.id);
    if (result){
      res.status(200).send("Orden Eliminada");
    }else{
      res.status(400).send("La Orden no se puede eliminar");
    } 
  }catch(error){
    res.status(500).send("Error.Intente mas tarde");
  }
});

app.put("/orders/:id", async(req,res)=>{

  const order = { id: req.params.id, ...req.body };
  console.log(order);
  try{
    const result = await OrderController.editOrder(order);
    if (result){
      res.status(200).send("Orden Actualizada");
    }else{
      res.status(400).send("Orden no se puede actualizar");
    } 
  }catch(error){
     res.status(500).send("Error.Intente mas tarde");
  };
});

