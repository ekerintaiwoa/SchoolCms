const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:true}));

const userController = require('./controller/userController');
 const backendController =  require('./controller/backendController');


router.get('/', userController.index) ;

// admincontroller routes

// to get the register page for the admin
 router.get('/admin/register' ,backendController.register)
 router.post('/admin/register' ,backendController.getEnteredData);


 // get login page
 router.get('/admin/login' ,backendController.login) ;



 // get data entered while logging in
 router.post('/admin/login' ,backendController.getLogin) ;

   // to get the admindashboard
 router.get('/admin' ,backendController.index)



 router.get('/admin/logout',backendController.logOut)


module.exports= router 