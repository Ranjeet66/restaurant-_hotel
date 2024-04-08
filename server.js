const express = require("express");
const app = express();
const port = 3000;

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


app.listen(port, () => {
    console.log("Listing on the port 3000");
});