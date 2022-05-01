import React, { useState } from 'react'
import Login from './component/Login'
import axios from 'axios'
import { BASEURL } from '../../constant'
import SweetAlert from 'react-bootstrap-sweetalert'
export default function LoginScreen() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [msg, setmsg] = useState(null)
  const handelLogin=async(e)=>{
    e.preventDefault()
    try {
      const params = { email, password };
      console.log(params);
      const response = await axios.post(
        BASEURL+"/api/user/login",
        params
      );
      console.log("RES:",response.data.token)
      await localStorage.setItem('token',JSON.stringify(response.data.token))
      await localStorage.setItem('userData',JSON.stringify(response.data.userData))
      window.location.href="/"
    } catch (error) {
      console.log(error)
      setmsg(error.response.data.msg);
    }
  }
  return (
    <>
    {msg && (
        <SweetAlert warning onConfirm={()=>{setmsg(null)}}>
          {msg}
        </SweetAlert>
      )}
    <Login
      email={email} setemail={setemail}
      password={password} setpassword={setpassword}
      handelLogin={handelLogin}
    />
    </>
  )
}
