var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    name : { type:String },
    email : { type:String },
    password : { type:String }
});

module.exports = mongoose.model('User',userModel);
