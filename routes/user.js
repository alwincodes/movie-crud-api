const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res)=>{
    let {username, email, password} = req.body;
    hashedPassword = await bcrypt.hash(password,10);
    newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword
    });
    try{
        await newUser.save();
        res.status(200).json({Status: "user Created"});
    }catch(err){
        console.log(err.message);
        res.status(500).json({Status: "error"});
    }
});

module.exports = router;