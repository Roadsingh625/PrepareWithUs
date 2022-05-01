import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SeeQuestion from './component/SeeQuestion'

export default function SeeQuestionScren() {
    const location = useLocation();
    const [questions, setquestions] = useState([])
    const [question, setquestion] = useState({})
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
      console.log(location.state);
      setquestions(location.state.question)
      setquestion(location.state.question[0])
      setisLoading(false)
    }, [])
    console.log(question);
  return (
    <>
    {
      isLoading?<h2>Loading...</h2>:
      <SeeQuestion 
        questions={questions}
        question={question}
        setquestion={setquestion}
      />
    }
    </>
  )
}
