'use strict'
var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { modelName } = require('./user');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

ArtistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Artist', ArtistSchema)
