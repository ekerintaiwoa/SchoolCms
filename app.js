const express = require('express') ;
const app = express() ;
const ejs = require('ejs') ;
require('dotenv').config() ;
const PORT = process.env.PORT ;

const db = require('./db') ;
const router = require('./router')


app.set('views','views');
app.set('view engine' ,'ejs') ;
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const bodyParser =  require('body-parser');


app.use("/",router) ;


app.listen(PORT, ()=>{

    console.log("connected to port 4750")
    
    
    })