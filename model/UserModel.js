const mongoose = require('mongoose');
const userSchema =  new mongoose.Schema({

userPassword:{
   type: String ,
   required : true

 },

 
 userName:{
    type: String ,
   required : true

 },
 email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

 } 


})

module.exports = mongoose.model("UserModel",userSchema) ;
