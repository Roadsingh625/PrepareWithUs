import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { apiCall } from "../../apiCall";
import { ENDPOINT } from "../../endPoint";
import Dashboard from "./component/Dashboard";
import Loader from '../../Component/Loader'
export default function DashboardScreen() {
  const [isLoading, setisLoading] = useState(true);
  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [newPassword, setnewPassword] = useState("");
  const [results, setresults] = useState([]);
  const [confirPassword, setconfirPassword] = useState("");
  const [showMSG, setshowMSG] = useState({ show: false, which: "danger" });
  const [msg, setmsg] = useState("");
  
  const changePassword = async (e) => {
    setisLoading(true);
    e.preventDefault();
    const params = {
      password: newPassword,
      confirPassword,
    };
    const res = await apiCall("POST", ENDPOINT.change_password, params);
    setmsg(res.data.msg);
    if (res.status == 200) setshowMSG({ show: true, which: "success" });
    else setshowMSG({ show: true, which: "danger" });
    setisLoading(false);
  };
  useEffect(() => {
    fetchResult()
  }, []);

  const fetchResult = async () => {
    setisLoading(true);
    const res = await apiCall("get", ENDPOINT.result);
    console.log(res);
    if (res.status == 200) {
      setresults(res.data.results);
    } else {
      setmsg(res.data.msg);
    }
    setisLoading(false);
  };
  console.log(results)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {showMSG.show && showMSG.which === "danger" ? (
            <SweetAlert
              danger
              onConfirm={() => {
                setshowMSG(false);
              }}
            >
              {msg}
            </SweetAlert>
          ) : showMSG.show && showMSG.which === "success" ? (
            <SweetAlert
              success
              onConfirm={() => {
                setshowMSG(false);
              }}
            >
              {msg}
            </SweetAlert>
          ) : null}
          <Dashboard
            userData={userData}
            newPassword={newPassword}
            setnewPassword={setnewPassword}
            confirPassword={confirPassword}
            setconfirPassword={setconfirPassword}
            changePassword={changePassword}
            results={results}
            msg={msg}
          />
        </>
      )}
    </>
  );
}
