const {Router}=require('express')
const { upload, getQuiz, getQuizQuestion, checkAns } = require('../controller/quiz.controller')
const {isAuthenticated}=require('../middleware/isAuthenticated')
const quizRoute=Router()
quizRoute.post('/',isAuthenticated,getQuiz)
quizRoute.post('/upload',isAuthenticated,upload)
quizRoute.post('/question',isAuthenticated,getQuizQuestion)
quizRoute.post('/check',isAuthenticated,checkAns)
module.exports=quizRoute