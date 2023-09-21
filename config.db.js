//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host     : 'localhost',
        port:3306,
        user     : 'root',
        password : '123456',
        database : 'listusers'
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};