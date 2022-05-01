import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ENDPOINT } from "../../endPoint";
import { apiCall } from "../../apiCall";
import Exam from "./component/Exam";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from 'moment'
export default function ExamScreen() {
  const location = useLocation();
  const [questions, setquestions] = useState([]);
  const [index, setindex] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [id, setid] = useState("");
  const [ans, setans] = useState("");
  const [showMSG, setShowMSG] = useState(false);
  const [time, settime] = useState({
    startTime:"",
    endTime:""
  })
  
  useEffect(() => {
    settime({...time,
      startTime:moment(location.state.questions.question.startDate).format("h:mm"),
      endTime:moment(location.state.questions.question.startDate).add(location.state.questions.question.duration,"hour").format("h:mm")
    })
    setid(location.state.questions.question._id);
    setquestions(location.state.questions.question.questions);
    setindex(location.state.questions.question.index>=0?location.state.questions.question.index:0)
    if(location.state.questions.question.index===location.state.questions.question.questions.length-1)
    {
      setShowMSG(true)
    }
    setisLoading(false);
  }, []);
  useEffect(() => {
    if (
      !(moment().format("h:mm") >= moment(questions.startDate).format("h:mm")) &&
      !(moment().format("h:mm") <=
        moment(questions.startDate).add(questions.duration, "hour").format("h:mm"))
    ) {
      window.location.href="/"
    }
  }, []);
  console.log(location.state.type);
  const handleAns = async () => {
    const params = {
      ans: ans,
      id: id,
      question_id: index,
    };
    console.log(location.state.type === "test"
        ? ENDPOINT.post_test_ans
        : ENDPOINT.post_quiz_ans,);
    const res = await apiCall(
      "POST",
      location.state.type === "test"
        ? ENDPOINT.post_test_ans
        : ENDPOINT.post_quiz_ans,
      params
    );
    if (res.status === 200) {
      setans("")
      if (index === questions.length-1) {
        setShowMSG(true);
      }else{
        setindex(index + 1);
      }
    }
  };
  return (
    <>
      {showMSG && (
        <SweetAlert
          success
          onConfirm={() => {
            setShowMSG(false);
            window.location.href = "/dashboard";
          }}
        >
          {"Exam Over Check Out In Result Section"}
        </SweetAlert>
      )}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Exam
          questions={questions}
          index={index}
          handleAns={handleAns}
          ans={ans}
          setans={setans}
          time={time}
        />
      )}
    </>
  );
}
