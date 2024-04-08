const express = require("express");
const app = express();
const PORT = process.env.PORT||3000;

require('dotenv').config();
const Person = require('./models/person');
const menuItem = require('./models/menuItem');
const db = require('./database/db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.send("Hello World");
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


app.listen(PORT, () => {
    console.log("Listing on the port 3000");
});