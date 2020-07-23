const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    authors: {type: Array, required: true},
    subtitle: {type: String},
    description: {type: String},
    thumbnail: {type: String},
    smallimg: {type: String}, 
    isFavorite: {type: Boolean},
    myCollection: {type: Boolean}
})

module.exports = mongoose.model('Book', bookSchema)