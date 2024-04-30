const express = require("express");
const app = express();
const PORT = process.env.PORT||3001;
const passport = require("./auth");

require('dotenv').config();
// const menuItem = require('./models/menuItem');
//const User = require('../models/user');

const db = require('./database/db');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to :${req.originalUrl}`);
    next(); 
};
app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});
app.get("/",function (req, res) {
    res.send("Welcome To India");
});

const userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);


app.listen(PORT, () => {
    console.log("Listing on the port 3001");
});