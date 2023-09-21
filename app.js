
//Load HTTP module
const express = require("express");
const mysql =require('mysql');
const cors =require('cors');

const { reset } = require("nodemon");
const app = express();

app.use(cors());
app.use(express.json());

 app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

var conexion =mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'listClients'
})

conexion.connect(function(error){
 if(error){
    console.log('hay un error',error)
 }  else{
    console.log('conexion ok')
 }
})
//obtner registros
const getUsers = (request, response) => {
    conexion.query("SELECT * FROM productosStock", 
    (error, results) => {
        if(error){

            throw error;
        }else{
           response.send(results)
        response.body(results.body)        }
       
    });
};
app.route("/productosStock")
.get(getUsers);

//buscar por id
app.get('/productosStock/:id',(req,res)=>{
    conexion.query("SELECT * FROM productosStock WHERE cod= ?",[req.params.id], 
    (error, results) => {
        if(error){

            throw error;
        }else{
           res.send(results)
        }
       
    });
})



app.delete('/productosStock/:id',(req,res)=>{
    conexion.query("DELETE FROM productosStock WHERE cod= ?",[req.params.id], 
    (error, results) => {
        if(error){

            throw error;
        }else{
           res.send(results)
        }
       
    });
})


/*delete 
const deleteUser = (request, response) => {
    const id = request.params.id;
    console.log(id)
    conexion.query("DELETE FROM productosStock WHERE cod= ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
            res.send(results)
    });
};

//ruta
app.route("/productosStock/:id")
.delete(deleteUser);
*/


//crear
app.post('/productosStock',(req,res)=>{

    let data={
        cod:req.body.cod,
        nombre:req.body.nombre,
        precio:req.body.precio,
        descuento:req.body.descuento,
        imagen:req.body.imagen
      }
     

    let sql="INSERT INTO productosStock SET ?";
    conexion.query(sql,data,function(error,results){
        if(error){

            throw error;
        }else{
           res.send(results)
        }
    });
   
})

//editar
const editUser = (req, res) => {
    let id=req.params.id;
 
    conexion.query('UPDATE productosStock SET ? WHERE cod = ?', [req.body, id],function(error,results){
        if(error){

            throw error;
        }else{
            console.log(results)
            res.send(results);
        }
    });

};

//ruta
app.route("/productosStock/:id")
.put(editUser);



const puerto=process.env.PUERTO || 3000

app.listen(puerto,function(){
    console.log('servidor ok')
})

