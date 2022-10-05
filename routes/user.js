'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'})


var api = express.Router();

api.get('/probando-controlador',md_auth.ensureAuth ,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
// api.post('/update/:id?',UserController.loginUser); opcional
api.put('/update/:id',md_auth.ensureAuth,UserController.updateUser); // se debe autorizar por mongo en el archivo global, en la peticion o en la funcion: https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

module.exports = api;