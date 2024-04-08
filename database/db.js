const mongoose = require('mongoose');

const mongodbURL = 'mongodb://0.0.0.0:27017/hotels';

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