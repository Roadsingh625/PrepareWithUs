const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    profession:{type:Number,required:true},
    company: { type: String, require: true },
    isAdmin:{type:Boolean,default:false}
})
module.exports=User=mongoose.model('user',UserSchema)