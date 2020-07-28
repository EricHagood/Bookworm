const express = require('express')
const bookworm = express.Router()
const Bookworm = require('../models/bookworm.js')

bookworm.get('/', (req, res)=>{
    Bookworm.find({}, (err, foundBook) => {
        if(err){
            res.status(400).json({Error: err.message})
        }
        res.status(200).json(foundBook)
    })
})

bookworm.post('/', (req, res)=>{
    Bookworm.create(req.body, (err, createdBook)=>{
        if(err){
            res.status(400).json({Error: err.message})
        }
        res.status(200).send(createdBook)
    })
})

bookworm.put('/:id', (req, res)=>{
    Bookworm.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBook)=>{
        if (err){
            res.status(400).json({Error: err.message})
        }
        res.status(200).send(updatedBook)
    })
})

bookworm.delete('/:id', (req, res)=>{
    Bookworm.findByIdAndDelete(req.params.id, (err, deletedBook)=>{
        if(err){
            res.status(400).json({Error: err.message})
        }
        res.status(200).send(deletedBook)
    })
})

module.exports = bookworm