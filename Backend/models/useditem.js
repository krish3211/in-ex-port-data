const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsedItemSchema  = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userName:{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    purpose :{
        type : String,
        required : true
    },
    usedQuantity :{
        type : String,
        required : true,
    },
    useDate :{
        type : String,
        required : true,
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('UsedItem', UsedItemSchema );