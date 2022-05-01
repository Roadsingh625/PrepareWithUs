import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { apiCall } from "../../apiCall";
import { ENDPOINT } from "../../endPoint";
import ForgetPassword from "./component/ForgetPassword";

export default function ForgetPasswordScreen() {
  const [email, setemail] = useState("");
  const [showMSG, setshowMSG] = useState(false)
  const [msg, setmsg] = useState('')
  const [status, setstatus] = useState(false)
  const handleForgetPassword = async (e) => {
      e.preventDefault()
    const res = await apiCall("POST", ENDPOINT.forget_password, { email });
    console.log(res);
    if(res.status===200)
    {
        setstatus(true)
    }   
    setmsg(res.data.msg);
    setshowMSG(true);
  };
  return (
    <>
      {(showMSG && status) ?(
        <SweetAlert
          success
          onConfirm={() => {
            setshowMSG(false);
            window.location.href = "/create-quiz";
          }}
        >
          {msg}
        </SweetAlert>
      ):showMSG&&
        <SweetAlert
          warning
          onConfirm={() => {
            setshowMSG(false);
            window.location.href = "/create-quiz";
          }}
        >
          {msg}
        </SweetAlert>
    }
      <ForgetPassword
        email={email}
        setemail={setemail}
        handleForgetPassword={handleForgetPassword}
      />
    </>
  );
}
