//importar
import express from "express"; // nueva forma nativo de javascript ECMAScript agregar en package.json "type": "module",
import usuarioRoutes from './routes/usuarioRoutes.js'
import dn from './config/db.js'
import db from "./config/db.js";

//crear la app
const app= express();

//Habiltar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))

//conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log('Conectado a la base de datos')
}catch(error){
    console.log(error)
}

//habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica
app.use(express.static('public'))

//Routingc
app.use('/auth', usuarioRoutes) 
 
//definir un puerto y arrancar el proyecto  
const port = 3000;
app.listen(port, ()=>{
    console.log(`EL servior funciona en el puerto ${port}`)
})