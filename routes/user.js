const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()

//refresh token storage never use in prod use a db like redis
const refreshTokens = []
//routes
router.post('/token', (req,res)=>{
    const refreshToken = req.body.token;
    if(refreshTokens.length < 1 || refreshToken === null) res.status(401).json({message:"unauthorised"});
    if(!refreshTokens.includes(refreshToken))res.status(403).json({message:"Forbidden"});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err)res.status(403).json({message:"invalid token"})
        const accessToken = generateAccessToken({email:user.email, username:user.username});
        res.status(200).json({accessToken: accessToken})
    })
})
router.post('/signup', async (req, res)=>{
    let {username, email, password} = req.body;
    let user = await UserModel.findOne({email: email});
    if(user){
        res.status(200).json({status:"Email already Taken!"});
        return;
    }
    let hashedPassword = await bcrypt.hash(password,10);
    let newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword
    });
    try{
        await newUser.save();
        res.status(200).json({status: "user Created"});
    }catch(err){
        console.log(err.message);
        res.status(500).json({status: "Username taken"});
    }
});

router.post('/login', async(req, res)=>{
    let {email, password} = req.body;
    let user = await UserModel.findOne({email: email});
    if(!user){
        res.status(200).json({status:"no user exists!"});
        return;
    }
    let passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare){
        res.status(200).json({status: "Invalid Password!!"});
        return;
    }
    const accessToken = generateAccessToken({email : user.email, username : user.username});
    const refreshToken = generateRefreshToken({email : user.email, username : user.username})
    refreshTokens.push(refreshToken);

    //jwt above
    res.status(200).json({status:"successfully logged in !!", accessToken: accessToken, refreshToken: refreshToken});

})

const generateAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'})
} 

const generateRefreshToken = (user)=>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"})
} 

module.exports = router;