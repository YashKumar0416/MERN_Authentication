const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const NewUserSchema = require('../models/UserNew');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_Secret = process.env.JWTSECRET;

//REGISTER USER
router.post('/newuser' ,
[body('name'),
body('email').isEmail(),
body('password').isLength({min: 5})],
 async (req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password, date} = req.body;
    try {
        const prevuser = await NewUserSchema.findOne({email});
        if(!prevuser) {
            
            //PASSWORD HASHING
            let salt = await bcrypt.genSalt(12)
            let secpassword = await bcrypt.hash(password, salt);
            
            const newuser = await NewUserSchema.create({name, email, password: secpassword, created: date});
            if (newuser) {
                return res.status(200).json({message: "User created successfully"})
            } else {
                return res.status(400).json({message: "No user created"})
            }
        }else {
            return res.status(400).json({message: "User Already Exists"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

// LOGIN USER
router.post('/login',
[body('email').isEmail(),
body('password').isLength({min: 5})],
 async(req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    try {
        const prevuser = await NewUserSchema.findOne({email});
        if (prevuser) {
            let pwdCompare = await bcrypt.compare(password, prevuser.password);
            if(pwdCompare) {

                let data = {
                    prevuser: {
                        id: prevuser._id
                    }
                }

                //JWT TOKEN GENERATION
                let authToken = await jwt.sign(data, jwt_Secret);
                return res.status(200).json({message: "User Found",authToken, prevuser})
            } else {
                return res.status(400).json({error: "Invalid Credentials"})
            }
        } else {
            return res.status(400).json({error: "No user found"})
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;