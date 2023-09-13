const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {User} = require("../models/UserModel")


const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    try {
        let {name,email,password} = req.body;
        let user = await User.findOne({where:{email}});
        if(user){
            res.status(200).json({"msg":"User is already registered"});

        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    let data = await User.build({
                        name,
                        email,
                        password:password
                    })
                    await data.save();
                    res.status(200).json({"msg":"User registered successfully"});
                }else if(err){
                    res.status(404).send({ msg: "something went wrong", err });
                }
            })
        }
    } catch (error) {
        res.status(200).json({"msg":error.message});
    }
})


userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({where:{email}});
        if(!user){
            res.status(200).json({"msg":"User is not registered"});
        }else{
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(err){
                    res.status(404).send({ msg: "something went wrong", err }); 
                }else{
                    let token = jwt.sign({userId:user.id,email:user.email,},process.env.KEY,{expiresIn:"2h"});
                    res.status(200).json({"msg":"login successfully",token,"name":user.name});
                }
            })
        }
    } catch (error) {
        res.status(404).send({ msg: "something went wrong", err }); 
    }
    
})



module.exports = {
    userRouter
}
