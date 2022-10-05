'use strict'
var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.port || 3977;
mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb://localhost:27017/spotify',{ useNewUrlParser: true,useUnifiedTopology: true},(err,res)=>{
    if(err){
        console.log(err);
        throw err;
    }else{
        console.log("DB corriendo!...");
        app.listen(port,()=>{
            console.log("Servidor Iniciado en el puerto "+ port);
        })
    }
})