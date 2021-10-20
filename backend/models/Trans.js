const mongoose = require('mongoose');
const { Schema } = mongoose;

var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

const TransSchema = new Schema({  // creating schema for user
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },
    title:{
        type: String,
        required: true,
        default: "title"
    },
    amount:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: "date"
    },

  });

  module.exports = mongoose.model('trans', TransSchema); 