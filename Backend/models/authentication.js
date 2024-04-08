const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role : { type: String, 
        enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not supported'
      },
      required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const User = mongoose.model("User", UserSchema);
  module.exports = User;