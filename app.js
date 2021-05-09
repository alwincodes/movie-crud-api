const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dbUrl = "mongodb://localhost/moviebase";
const movieRouter = require("./routes/movies");
const userRouter = require("./routes/user");
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/movies',movieRouter);
app.use('/api/user', userRouter);

//connecting with database
mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
const conn = mongoose.connection;
conn.on('open', ()=>console.log("Connect to DB"));

//specifies which port to listen to
app.listen(5000,()=>{
    console.log(`server live on http://localhost:${5000}`);
})