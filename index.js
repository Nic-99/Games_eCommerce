const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
//const { adduser, getUser, deleteUser, getUsers} = require("./users");

const uri = process.env.MONGO_URI;

/*
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected");
    })
    .catch((err) => consol.log(err))
*/

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hola estoy funcionando. ");
});

// Obtengo info de los usarios
app.get("/users", (req,res) => {

    res.send("Listo los usuarios");
});

// Obtengo info de un usuario especifico
app.get("/users/:id", (req,res) => {
    
    let userId = req.params.id;
    //console.log(userId);
    //res.send("Obtengo un usuario");
    user = {"name":"Pepe", "lastname":"Alegria"};
    res.json(user);
});

app.post("/", (req,res) =>{
    res.send("Llamada Post");
});

// Creo un nuevo usuario
app.post("/users", (req,res) => {

    let name = req.body.name;
    let lastname = req.body.lastname;
    console.log(name);
    res.send("Creo usuario");
});

// Modifico un ususario
app.put("/users/:id", (req,res) => {

    const userId = req.params.id;
    let name = req.body.name;
    console.log(name);
    res.send("Edito usuario");
});

// Elimino usuario
app.delete("/users/:id", (req,res) => {
    res.send("Elimino un usuario");
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});