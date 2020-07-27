//Express
const express = require('express');
const app = express();
//dotenv
const dotenv = require('dotenv');
dotenv.config();
//Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,

}, ()=>{
    console.log('Connected to Mongoose');
})

app.use(express.json());

//Importing Routes
const authRoute = require('./routes/auth'); 
const postRoute = require('./routes/posts');
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

//server 
app.listen(5000, ()=>{
    console.log('Server is up and running on Port 5000');
})