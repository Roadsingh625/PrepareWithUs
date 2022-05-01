import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RestPassword from './component/RestPassword'
import { apiCall } from "../../apiCall";
import { ENDPOINT } from "../../endPoint";
import SweetAlert from 'react-bootstrap-sweetalert';
export default function RestPasswordScreen() {
    const location=useLocation()
    const [details, setDetails] = useState()
    const [showMSG, setshowMSG] = useState(false)
  const [msg, setmsg] = useState('')
  const [status, setstatus] = useState(false)
    useEffect(() => {
      const values=location.pathname.split('/')
      setDetails({...details,
        email:values[2],
        token:values[3],
        password:"",
        passwordCon:""
    })
    }, [])
    const handleResetPassword=async(e)=>{
      e.preventDefault()
        const res=await apiCall("POST",ENDPOINT.rest_password,details)
        if(res.status===200)
    {
        setstatus(true)
    }   
    setmsg(res.data.msg);
    setshowMSG(true);
    }
  return (
    <>
    {(showMSG && status) ?(
      <SweetAlert
        success
        onConfirm={() => {
          setshowMSG(false);
          window.location.href="/login"
        }}
      >
        {msg}
      </SweetAlert>
    ):showMSG&&
      <SweetAlert
        warning
        onConfirm={() => {
          setshowMSG(false);
        }}
      >
        {msg}
      </SweetAlert>
  }
    <RestPassword
    details={details}
    setDetails={setDetails}
    handleResetPassword={handleResetPassword}
    /></>
  )
}
    