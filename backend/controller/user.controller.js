const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const validator = require("validator");
const nodemailer=require('nodemailer')
const register = async (req, res) => {
  const { email, password, username, name, company, profession } = req.body;
  const validEmail = validator.isEmail(email);
  if (validEmail) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        name,
        profession,
        company,
      });
      user.save((err) => {
        if (err) return res.status(400).json({ msg: "Something Went Worng" });
        return res.status(200).json({ msg: "User Register Sussecfully" });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ msg: "Not Vaild Email" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(401).json({ msg: "Not Vaild User" });
      else {
        if (!bcrypt.compareSync(password, user.password))
          return res.status(401).json({ msg: "Not Vaild User" });
        else {
          const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            "Pasowrd1232"
          );
          return res.status(200).json({ token: token, userData: user });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const changePassword = async(req, res) => {
  const { password, confirPassword } = req.body;
  if (password === confirPassword) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    let doc=await User.findOneAndUpdate(
      { _id: req.user.userId },
      { password: hashedPassword });
      if(doc)
        return res.status(200).json({msg:"Password Change Successfully"})
  } else {
    res.status(201).json({ msg: "New Password And Confirm Password Is Not Correct" });
  }
};
const forgetPassowrd=async(req,res)=>{
  const {email}=req.body
  const userExist=await User.findOne({email:email}).exec()
  if(userExist)
  {
    const secret=userExist.password+"Pasowrd1232"
    const token=jwt.sign({email:userExist.email,id:userExist._id},secret,{expiresIn:"15m"})
    const link=`${process.env.URL}/reset-password/${userExist.email}/${token}`
    console.log(link)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password
        
      }
    });
    
    var mailOptions = {
      from:process.env.email ,
      to: userExist.email,
      subject: 'Reset Password',
      text: `Open Link to reset your password vaild till 15min ${link}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.status(200).json({msg:"Check out your email"})
  }
  return res.status(402).json({msg:"Not Vaild Email"})
}
const restPassword=async(req,res)=>{
  const {email,token,password,passwordCon}=req.body 
  const userExist=await User.findOne({email:email}).exec()
  const secret=userExist.password+"Pasowrd1232"
  try {
    const payload=jwt.verify(token,secret)
    if(password==passwordCon){
    const hashedPassword=bcrypt.hashSync(password,10)
    User.findOneAndUpdate({email:payload.email},{password:hashedPassword},(err,response)=>{
      if(err) throw err
      return res.status(200).json({msg:"Password Rest Successfully"})
    })
    
  }else{
    res.status(201).json({msg:"New Password and Conform Password are not correct"})
  }
  } catch (error) {
    console.log(error);
    return res.status(401).json({msg:"Not Vaild User"})
  }

}
module.exports = { login, register,changePassword,forgetPassowrd,restPassword};
