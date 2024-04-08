// connectToMongo function in db.js
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://root:toor@10.4.20.161:8284/';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongo;
