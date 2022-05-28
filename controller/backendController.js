const bodyParser =  require('body-parser');
const User = require('../model/userModel');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage =  new LocalStorage('./scratch') ;


const config = require('../config');



// to get the register page for the admin

exports.register = (req,res)=>{

    res.render('backend/register')
    
    
    }
    



//get the data entered in the registered page


exports.getEnteredData = (req,res)=>{
    console.log(req.body);
    const password = req.body.password ;
    const hasshedpassword =   bcrypt.hashSync(password, 8)

   
     try {

        const newUser = new User({

            userName: req.body.firstname ,
           userPassword:hasshedpassword ,
           email: req.body.email 
        }) ;

        newUser.save();
       
       //create token
        var token = jwt.sign({id:newUser._id},config.secrets,{expiresIn:86400});

        // send the generated token
       // res.status(200).send({auth:true ,token:token})
       localStorage.setItem('authtoken',token);

       // localStorage.setItem('authtoken',token) ;

        res.redirect('/admin/login');

       console.log("user saved into database");


         
     } catch (error) {
         
        console.log(error) ;
        res.redirect("/admin/register")


     }

  
}



// get login page


exports.login = (req,res)=>{

    res.render('backend/login') ;
    
    
    }



    // get data entered while loging in

    exports.getLogin = (req,res)=>{

         User.findOne({email:req.body.email},(err,user)=>{
            if (err) return res.status(500).send('Error on the server.');
             const string = encodeURIComponent('! Please enter valid value');
             if (!user) { res.redirect('/?valid=' + string);}

             else{

                const passwordIsValid = bcrypt.compareSync(req.body.password, user.userPassword);
               if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
               var token = jwt.sign({ id: user._id }, config.secrets, {
                expiresIn: 86400 // expires in 24 hours
            });
            localStorage.setItem('authtoken', token)

            res.render('backend/index') ;

             }


         })

    }



         // to access the dashboard for admin
         exports.index= (req,res)=>{

            var token = localStorage.getItem('authtoken')
            console.log("token>>>",token)
                if (!token) {
                    res.redirect('/')
                }

                jwt.verify(token,config.secrets,(err,decoded)=>{
                    if (err) {
                        res.redirect('/')
                    };

                    User.findById(decoded.id,{userPassword:0},(err,user)=>{

                        if (err) {res.redirect('/')}
                        if (!user) {res.redirect('/')}
                        res.render('backend/index')

                    })

                })

         }





         // logout user

         exports.logOut= (req,res)=>{
          
            localStorage.removeItem('authtoken');
            res.redirect('/');




         }
