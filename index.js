//importar
const express = require('express')

//crear la app
const app= express();

//Routin
app.get('/', function(req, res){
    res.send('Hola mundo en express')
    //res.json({message:'HOla mundo'})
})


//definir un puerto y arrncar el proyecto
const port = 3000;

app.listen(port, ()=>{
    console.log(`EL servior funciona en el puerto ${port}`)
})