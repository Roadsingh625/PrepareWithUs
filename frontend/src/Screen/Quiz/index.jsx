import React, { useEffect, useState } from 'react'
import Quiz from './component/Quiz'
import { apiCall } from "../../apiCall";
import { ENDPOINT } from '../../endPoint';
import { useNavigate } from 'react-router-dom';
export default function QuizScreen() {
  let navigation = useNavigate();
  const [tab, setTab] = useState(1)
  const [quizs, setquizs] = useState([])
  const [msg, setmsg] = useState('')
  const [type, settype] = useState('aptitude')
  const [searchArray, setsearchArray] = useState([])
  const [search, setsearch] = useState('')
  useEffect(() => {
    fecthQuiz()
  }, [tab])
  console.log(tab);
  const fecthQuiz=async()=>{
    const res=await apiCall("POST",ENDPOINT.quiz_list,{tab,type})
    console.log(res)
    if(res.status===200)
    {
      setquizs(res.data.questions)
      setsearchArray(res.data.questions)
    }else{
      setquizs([])
      setmsg(res.data.msg)
    }
  }
  const SeeQustion=(question)=>{
    navigation('/questions',{state:{question}})
  }
  const fetchQuestion=async(id)=>{
    const res=await apiCall("POST",ENDPOINT.fetch_quiz_question,{id})
    console.log(res.data);
    if(res.status===200)
      navigation('/exam',{state:{questions:res.data,type:"quiz"}})
  }
  const handleFilter=(val)=>{
    console.log(val);
    setsearch(val)
    if(val==="")
      setquizs([...searchArray])
    else{
      const result=searchArray.filter(x=>{
        return x.name.toLowerCase().includes(val.toLowerCase())
      })
      setquizs([...result])
    }
  }
  return (
    <Quiz
    tab={tab}
    setTab={setTab}
    quizs={quizs}
    msg={msg}
    SeeQustion={SeeQustion}
    fetchQuestion={fetchQuestion}
    type={type}
    settype={settype}
    search={search}
    setsearch={setsearch}
    handleFilter={handleFilter}
    fecthQuiz={fecthQuiz}
    />
  )
}
