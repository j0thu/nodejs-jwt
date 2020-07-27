//Express
const router = require('express').Router();
//User Model
const User = require('../models/User');
//JWT
const jwt = require('jsonwebtoken');
//Register Validation Function
const {regsiterValidation, loginValidation} = require('../validation'); 
//BcryptJS
const bcrypt = require('bcryptjs');
 
//REGISTER ROUTE
router.post('/register', async(req, res)=>{
  const {error} = registerValidation(req.body); 
  //error
  if(error) return res.status(400).send(error.details[0].message);
  
  //Email already exists (unique)
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists ! ');

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    }
    catch(err){
          res.status(400).send(err);
    }
})

//LOGIN ROUTE
router.post('/login', async(req, res)=>{
    const {error} = loginValidation(req.body);
    //error
    if(error) return res.status(400).send(error.details[0].message);

    //Email already exists - Already registered
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is Incorrect!');

    //Password is Correct or Not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})

//Exporting the router
module.exports = router; 