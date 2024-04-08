const mongoose = require('mongoose');
const {API_BASE_URL} = require("./config");

// const mongoURI = config.API_BASE_URL;

const connectToMongo = ()=>{
    mongoose.connect(API_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('connected'))
    .catch(e=>console.log(e));
}

module.exports = connectToMongo;