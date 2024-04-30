const mongoose = require('mongoose');
require('dotenv').config();


//const mongodbURL = 'mongodb://0.0.0.0:27017/hotels';
//Define the MongoDB connection URL
//const mongodbURL = 'mongodb://0.0.0.0:27017/dbhotels';
//const mongodbURL  = 'mongodb+srv://Ranjeet:Ranjeet123@cluster0.9gdueml.mongodb.net/';

// const mongodbURL = process.env.MONGODB_URL_LOCAL; 
const mongodbURL = process.env.MONGODB_URL;


mongoose.connect(mongodbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to the MongoDB Server');
});

db.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;