//importar
import express from "express"; // nueva forma nativo de javascript ECMAScript agregar en package.json "type": "module",
import usuarioRoutes from './routes/usuarioRoutes.js'

//crear la app
const app= express();

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