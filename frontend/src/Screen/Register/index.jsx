import React, { useState } from "react";
import Register from "./component/Register";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { BASEURL } from "../../constant";
export default function RegisterScreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [profession, setprofession] = useState(1);
  const [company, setcompany] = useState("");
  const [msg, setmsg] = useState(null);
  const handelRegister = async (e) => {
    e.preventDefault();
    try {
      const params = { email, password, name, profession, company };
      console.log(params);
      const response = await axios.post(
        BASEURL+"/api/user/register",
        params
      );
      window.location.href="/login"
    } catch (error) {
      console.log("error", error);
      setmsg(error.response.data.msg);
    }
  };
  return (
    <>
      {msg && (
        <SweetAlert warning onConfirm={()=>{setmsg(null)}}>
          {msg}
        </SweetAlert>
      )}
      <Register
        email={email}
        setemail={setemail}
        password={password}
        setpassword={setpassword}
        name={name}
        setname={setname}
        profession={profession}
        setprofession={setprofession}
        company={company}
        setcompany={setcompany}
        handelRegister={handelRegister}
      />
    </>
  );
}
