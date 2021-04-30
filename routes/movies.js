const express = require("express");
const router = express.Router();
const MovieSchema = require('../models/movie');
const auth = require('../middleware/authentication')



router.get('/', async (req, res)=>{
    const allMovies = await MovieSchema.find();
    res.status(200).json(allMovies);
});

router.get('/:id', async (req, res)=>{
    let movieId = req.params.id;
    try{
        const resultMovie = await MovieSchema.findById(movieId );
        res.status(200).json(resultMovie);
    }catch(err){
        res.status(500).json({Status:"Something went wrong"});
    }
    
});

//private routes below authentication required
router.use(auth);

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
        res.status(200).json({message: "Data Added!"});
    }catch(err){
        res.status(500).json({message: "Error occoured"});
    }
});

router.put('/:id', async (req, res)=>{
    let updateId = req.params.id;
    let data = req.body;
    let prevData = await MovieSchema.findById(updateId);
    let updateData = {
       ...prevData, ...data
    };
    let query = {_id: updateId};
    try{
        let updateStatus = await MovieSchema.updateOne(query, updateData);
        res.status(200).json({Status: "Updated"});
    }catch(err){
        res.status(500).json({Status: "Can't Update"});
    }
});

router.delete('/:id', async (req, res)=>{
    let deleteId = req.params.id;
    console.log(deleteId)
    let deleteData = await MovieSchema.deleteOne({_id: deleteId});
    res.status(200).json({status: deleteData.deletedCount});
});



module.exports = router;