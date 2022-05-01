const {Router}=require('express')
const { upload, getTest,getTestQuestion,checkAns } = require('../controller/test.controller')
const {isAuthenticated}=require('../middleware/isAuthenticated')
const testRoute=Router()
testRoute.post('/',isAuthenticated,getTest)
testRoute.post('/upload',isAuthenticated,upload)
testRoute.post('/question',isAuthenticated,getTestQuestion)
testRoute.post('/check',isAuthenticated,checkAns)
module.exports=testRoute