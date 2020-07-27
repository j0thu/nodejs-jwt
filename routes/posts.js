const router = require('express').Router();
const verify = require('./verifytoken');
const User = require('../models/User');
//New Route
router.get('/', verify, (req, res)=>{
    res.json({
        posts:{
            name:"New Post",
            Description: "Sample Random Text"
        }
    })
    // res.send(req.user);
    

})

module.exports = router;
