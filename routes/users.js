const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getUsers = (request, response) => {
    connection.query("SELECT * FROM users", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/users")
.get(getUsers);


const postUser= (request, response) => {
    const {plato, descripcion, precio, disponible} = request.body;
    connection.query("INSERT INTO users(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ", 
    [plato, descripcion, precio, disponible],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/users")
.post(postUser);


const delUser = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from user  where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/user/:id")
.delete(delUser);


module.exports = app;