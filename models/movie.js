const mongoose = require('mongoose');

//Schema for the movie table or collection
const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    runtime:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    cast:{
        type: Array,
        required: true
    },
    description:{
        type: String,
    },
    posterUrl:{
        type: String,
        default: "/static/lmfao.jpg"
    }
});

module.exports = mongoose.model("Movies", movieSchema);