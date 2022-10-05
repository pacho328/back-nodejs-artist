'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-paginate');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


function getArtist(req,res){
    var artistId = req.params.id;
    Artist.findById(artistId,(err,artist)=>{
        if(err){
            res.status(500).send({message: "Error de la peticion"})
        }else{
            if(!artist){
                res.status(500).send({message: "El artista no exite"})
            }else{
                res.status(200).send({artist})
            }
        }
    })
    // res.status(200).send({message: 'metodo getartist'});
}

function getArtists (req, res){
    
    if(req.params.page){
        var page = req.params.page;
    }else{
        page = 1;
    }
    var itemsPerPage = 3;
    Artist.find({},function(err,artists){
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }
        else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas'});
            }else{
                return res.status(200).send({
                    artists: artists
                });
            }
        }
    }).sort('name');
}

async function updateArtist(req, res){
    const artistID = req.params.id;
    const update = req.body;
    try {
        let arttemp = await Artist.findByIdAndUpdate(artistID,update);
        if(!arttemp){
            res.status(404).send({message: "Elemento no encontrado"});
        }
        res.status(200).send({arttemp});
    }
    catch(err){
        res.status(500).send({error: err})
    }
    // otra manera de hacerlo
    // Artist.findByIdAndUpdate(artistID,update,(err, artist)=>{
    //     if(err){
    //         res.status(500).send({message: "Error en la peticion"});
    //     }else{
    //         if(!artist){
    //             res.status(404).send({message: "No ha sido actualizado"});
    //         }else{
    //             res.status(200).send({artist});
    //         }
    //     }
    // });

}

async function deleteArtist(req,res){	
	var artistId  = req.params.id;
	try{
		let artistDeleted = await Artist.findByIdAndRemove(artistId);
		if(!artistDeleted){
			res.status(400).send({message: 'No existe'});
		}else{  
			try{
				let AlbumDeleted = await findByIdAndRemove(artistId);
				res.status(200).send({message: 'Artista Eliminado'});
			}catch(err)
			{
				res.status(500).send({message: err})
			}
		}
	}catch(err){
		res.status(500).send({message: err})
	}
}

function saveArtist(req, res){
    var artist = Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = "null";

    artist.save((err, artistStored)=>{
        if(err){
            res.status(500).send({message: 'error artista guardar'})
        }else{
            if(!artistStored){
                res.status(500).send({message: 'error artista no ha guardado'})
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    })

}

function uploadImage(req,res){
    var artistId = req.params.id;
    var file_name = 'No subido..';
    if(req.files){
        var files_path = req.files.image.path;
        var files_split = files_path.split('/');
        var file_name = files_split[2];
        var ext_split  = file_name.split('.');
        var file_ext = ext_split[1];
        
        if(file_ext.toLowerCase() == 'png' || file_ext.toLowerCase() == 'jpg' || file_ext.toLowerCase() == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image: file_name},(err, userUpdateIma)=>{
                if(err){
                    res.status(500).send({message: 'error al actulizar'});
                }else{
                    if(!userUpdateIma){
                        res.status(404).send({message: 'no se ha podido actualizar'});
                    }else{
                        console.log(userUpdateIma);
                        res.status(200).send({artist: userUpdateIma});
                    }
                }
                
            })
        }else{
            res.status(200).send({message: 'Extension no valida image..'})
        }
    }else{
        res.status(200).send({message: 'No has ninguna image..'})
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artist/'+imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    })
}

module.exports ={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    uploadImage,
    getImageFile
}
