const mongoose = require('mongoose');
require('dotenv').config() ;

// connect to the database 

mongoose.connect(process.env.CONNECTION , (err)=>{

     if(err){
      console.log('error connecting to database');
      console.log(err);

     }

     console.log('successfully connected to database');


})
