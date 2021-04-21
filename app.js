const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dbUrl = "mongodb://localhost/moviebase";
const movieRouter = require("./routes/movies");
//middleware
app.use(express.json());

//routes
app.use('/api/movies',movieRouter);

//connecting with database
mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology: true})
const conn = mongoose.connection;
conn.on('open', ()=>console.log("Connect to DB"));

//specifies which port to listen to
app.listen(5000,()=>{
    console.log(`server live on http://localhost:${5000}`);
})