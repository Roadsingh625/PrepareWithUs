const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ResultSchema = new Schema({
    score:{type:Number,default:0},
    quiz:{type:Schema.Types.ObjectId,ref:'quiz'},
    test:{type:Schema.Types.ObjectId,ref:'test'},
    sumbittedBy:{type:Schema.Types.ObjectId,ref:"user",required:true},
    outOf:{type:Number,required:true},
    index:{type:Number,default:-1}
},{timestamps:true})
module.exports=Result=mongoose.model('result',ResultSchema)