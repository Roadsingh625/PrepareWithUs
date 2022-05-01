const {Router}=require('express')
const getResult = require('../controller/result.controller')
const {isAuthenticated}=require('../middleware/isAuthenticated')
const resultRoute=Router()
resultRoute.get("/",isAuthenticated,getResult)
module.exports=resultRoute
