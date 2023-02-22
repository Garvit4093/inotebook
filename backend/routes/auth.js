const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetch=require('../middleware/fetch');
const JWT_token="Garvitgupta79";
//create a user
router.post('/createUser',[
    body('name','Enter minimum 3 characters!').isLength({ min: 3 }),
    body('email','Enter a valid email!').isEmail(),
    body('password','Enter minimum 6 characters!').isLength({ min: 6 }),
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists."})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)

    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      //  res.json({error:'Please enter a unique email.'})})
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_token);
      success=true;
      res.json({success,authtoken});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Server error occured.");
    }
})
//authenticate user
router.post('/login',[
  body('email','Enter a valid email!').isEmail(),
  body('password','Enter minimum 6 characters!').isLength({ min: 6 }),
],async(req,res)=>{
  let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const{email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      success=false;
      return res.status(400).json({success,error:"Invalid Credentials!"});
    }
    const pasCom=await bcrypt.compare(password,user.password);
    if(!pasCom){
      success=false;
      return res.status(400).json({success,error:"Wrong password!"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_token);
    success=true;
    res.json({success,authtoken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error occured.");
  }
})
//get user
router.post('/getUser',fetch,async(req,res)=>{
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server error occured.");
}
})
module.exports=router