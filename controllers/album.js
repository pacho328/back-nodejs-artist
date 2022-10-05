'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-paginate');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req,res){
	res.status(200).send({message: 'Album exitoso'});
}

async function saveAlbum(req,res){
	var album = new Album();
	var params = req.body;

	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;
	try{
		let albumStored = await album.save();
		if(!albumStored){		
			res.status(400).send({message: err})
		}else{
			res.status(200).send({album: albumStored});
		}
	}catch(err){
		res.status(500).send({message: err})
	}
}

async function getAlbum(req, res){
	var albumId = req.params.id
	console.log(albumId);
	
	try{// populate sirve para traer los datos del artista asociado al album
		let album = await Album.findById(albumId).populate({path: 'artist'});
		if(!album){
			res.status(404).send({message: 'Error interno'})
		}else{
			res.status(200).send({album});
		}
	}catch(err){
		res.status(500).send({message: err})
	}
}

module.exports = {
	getAlbum,
	saveAlbum,
	getAlbum
}
