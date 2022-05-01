import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../apiCall'
import { ENDPOINT } from '../../endPoint'
import Test from './component/Test'

export default function TestScreen() {
  let navigation = useNavigate();
  const [tab, setTab] = useState(1)
  const [tests, settests] = useState([])
  const [msg, setmsg] = useState('')
  const [type, settype] = useState('aptitude')
  const [searchArray, setsearchArray] = useState([])
  const [search, setsearch] = useState('')
  const [company, setcompany] = useState('')
  useEffect(() => {
    fecthTest()
  }, [tab])
  const fecthTest=async()=>{
    const res=await apiCall("POST",ENDPOINT.test_list,{tab,type,company})
    console.log(res)
    if(res.status===200)
    {
      settests(res.data.questions)
      setsearchArray(res.data.questions)
    }else{
      settests([])
      setmsg(res.data.msg)
    }
  }
  const SeeQustion=(question)=>{
    navigation('/questions',{state:{question}})
  }
  const fetchQuestion=async(id)=>{
    console.log(id);
    const res=await apiCall("POST",ENDPOINT.fetch_test_question,{id})
    console.log("===>",res.data);
    if(res.status===200)
      navigation('/exam',{state:{questions:res.data,type:"test"}})
  }
  const handleFilter=(val)=>{
    console.log(val);
    setsearch(val)
    if(val==="")
      settests([...searchArray])
    else{
      const result=searchArray.filter(x=>{
        return x.name.toLowerCase().includes(val.toLowerCase())
      })
      settests([...result])
    }
  }
  return (
    <Test
    tab={tab}
    setTab={setTab}
    tests={tests}
    msg={msg}
    SeeQustion={SeeQustion}
    fetchQuestion={fetchQuestion}
    type={type}
    settype={settype}
    search={search}
    setsearch={setsearch}
    handleFilter={handleFilter}
    setcompany={setcompany}
    company={company}
    fecthTest={fecthTest}
    />
  )
}
