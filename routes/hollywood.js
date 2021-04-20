const express = require("express");
const router = express.Router();
const MovieSchema = require('../models/movie');

router.get('/', async (req, res)=>{
    const allMovies = await MovieSchema.find();
    res.status(200).json(allMovies);
})

router.post('/', async (req, res)=>{
    const data = req.body;
    const movieData = new MovieSchema({
        name: data.name,
        genre: data.genre,
        language: data.language,
        runtime: data.runtime,
        year: data.year,
        cast: data.cast,
        description: data.description,
        posterUrl: data.posterUrl
    });

    try{
        const savedData = await movieData.save();
        res.status(200).json(savedData);
    }catch(err){
        res.status(500).json({message: "Error occoured"});
    }
})
module.exports = router;