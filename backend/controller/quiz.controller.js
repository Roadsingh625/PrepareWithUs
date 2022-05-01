const Quiz = require("../model/quiz");
const moment = require("moment");
const Result = require("../model/result");
const user = require("../model/user");
const upload = async (req, res) => {
  const { name, code, desc, questions, duration, startDate,type } = req.body;

  let userExist = await user.findOne({ _id: req.user.userId }).exec();
  if (userExist) {
    if(userExist.profession && userExist.isAdmin){
    const newQuiz = new Quiz({
      name,
      code,
      desc,
      questions,
      duration,
      startDate,
      author: req.user.userId,
      company: userExist.company,
      type:type
    });
    newQuiz.save((err) => {
      if (err) throw err 
      // return res.status(400).json({ msg: "Something Went Worng" });
      return res.status(200).json({ msg: "New Quiz Is Added" });
    });}else{
      return res.status(401).json({msg:"Not Vaild User"})
    }
  }
};
const getQuiz = async (req, res) => {
  const { tab,type} = req.body;

  if (tab === 1) {
    const today = moment().startOf("day");
    Quiz.find(
      {
        startDate: {
          $gte:today.toDate(),
          $lte:today.endOf("day").toDate()
        },
        $or:[
          {type:type},
        ],
      },
      (err, questions) => {
        if (err) throw err;
        if (questions.length > 0) return res.status(200).json({ questions });
        else return res.status(201).json({ msg: "No Quiz Found" });
      }
    );
  } else if (tab === 0) {
    const prevDay = moment().endOf("day").subtract(1, "day");
    Quiz.find(
      {
        startDate: {
          $lte: prevDay.toDate(),
        },
        $or:[
          {type:type},
        ],
      },
      (err, questions) => {
        if (err) throw err;
        if (questions.length > 0) return res.status(200).json({ questions });
        else return res.status(201).json({ msg: "No Quiz Found" });
      }
    );
  } else if (tab === 2) {
    const today = moment().startOf('day');
    const nextDay = today.add(1, "day");
    Quiz.find(
      {
        startDate: {
          $gte: nextDay.toDate(),
        },
        $or:[
          {type:type},
        ],
      },
      (err, questions) => {
        if (err) throw err;
        if (questions.length > 0) return res.status(200).json({ questions });
        else return res.status(201).json({ msg: "No Quiz Found" });
      }
    );
  }
};
const getQuizQuestion = async (req, res) => {
  const { id } = req.body;
  const today = new Date();
  Quiz.findOne({ _id:id }, async(err, question) => {
    if (err) throw err;
    const duration = moment(question.startDate)
      .add(question.duration, "hours")
      .toDate();
    if (question) {
      if (today >= question.startDate && today <= duration) {
        const result=await Result.findOne({ sumbittedBy: req.user.userId,quiz:id }).exec();
        let questions=question._doc
        questions['index']=result?result.index:-1
        return res.status(200).json({ question:questions });
      } 
      else if (today > duration) {
        return res.status(200).json({ question });
      } 
      else return res.status(201).json({ msg: "Quiz Not Started" });
    } else return res.status(201).json({ msg: "NO Quiz Question" });
  });
};
const checkAns = async(req, res) => {
  const { ans, id, question_id } = req.body;
  
  Quiz.findById({ _id: id }, async (err, Quiz) => {
    if (err) return res.status(401).json("Something Went Worng");
    const question = Quiz.questions[question_id];
    const prevResult = await Result.findOne({ sumbittedBy: req.user.userId,quiz:id }).exec();
    if(prevResult)
    {
      const prevScore=prevResult.score
      if (question.ans == ans) {
        await Result.findOneAndUpdate({sumbittedBy:req.user.userId,quiz:id},{score:prevScore+1,index:question_id})
        return res.status(200).json({msg:"Question Compeleted"})
      } else {
        await Result.findOneAndUpdate({sumbittedBy:req.user.userId,quiz:id},{score:prevScore-1,index:question_id})
        return res.status(200).json({msg:"Question Compeleted"})
      }
    }else{
      const newResult=new Result({
        sumbittedBy:req.user.userId,
        score:question.ans == ans?1:-1,
        quiz:id,
        outOf:Quiz.questions.length,
        index:question_id
      })
      newResult.save(err=>{
        if(err) throw err
        return res.status(200).json({msg:"Question Submitted"})
      })
    }
  });
};
module.exports = { upload, getQuiz, getQuizQuestion, checkAns };
