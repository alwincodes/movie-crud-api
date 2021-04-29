const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post('/signup', async (req, res)=>{
    let {username, email, password} = req.body;
    let user = await UserModel.findOne({email: email});
    if(user){
        res.status(200).json({status:"Email already Taken!"});
    }
    let hashedPassword = await bcrypt.hash(password,10);
    let newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword
    });
    try{
        await newUser.save();
        res.status(200).json({Status: "user Created"});
    }catch(err){
        console.log(err.message);
        res.status(500).json({Status: "Username taken"});
    }
});

router.post('/login', async(req, res)=>{
    let {email, password} = req.body;
    let user = await UserModel.findOne({email: email});
    if(!user){
        res.status(200).json({status:"no user exists!"});
    }
    let passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare){
        res.status(200).json({status: "Invalid Password!!"});
    }

    console.log(process.env.ACCESS_TOKEN_SECRET) 
    //jwt auth code
    //signing email here
    const accessToken = jwt.sign({email : user.email, username : user.username}, process.env.ACCESS_TOKEN_SECRET)

    //jwt above
    res.status(200).json({message:"successfully logged in !!", accessToken: accessToken});

})



module.exports = router;