const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require ("../models/userModel")
const userModel = require("../models/userModel")


const router = express.Router()

//signup
router.post("/api/signup",async (req,res) => {
    const {name,email,password} = req.body;
    //checking whether the user exists
    const existingPerson = await User.findOne({email:email});
    if (existingPerson){
        res.status(400).json({
         message:"user already exist"
        })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10)

    //newuser
    try {
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.json({message:"user registered successfully"})
    } catch (error) {
        console.error(error)
        res.send(400).json({message:"error occured"})
    }
})
//login
router.post("/api/login",async (req,res) => {
    try {
        const {email,password} = req.body
        // checking the user
        const user = await User.findOne({email})
        if(!user) {
            res.send(400).json({message:"invalid credentials"})
        }
        //comparing passwords
        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch) {
            res.send(400).json({message:"invalid credentials"})
        }
        //jwt token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRETKEY,{expiresIn:"10h"})
        res.json({message:"login successfully",token})
    } catch (error) {
        console.error(error)
        res.send(400).json({message:"error occured"})   
    }
})

module.exports = router;
