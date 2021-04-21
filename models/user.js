const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require: true
    },
    authLevel:{
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Users", userSchema);