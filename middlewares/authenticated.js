'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_sec';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene'})
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'token no valido 1'})
        } 
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'Token no valido 2'});
    }
    req.user = payload;
    next();

}
