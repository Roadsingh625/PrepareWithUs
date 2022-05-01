import moment from "moment";
import React, { useState } from "react";

export default function Dashboard(props) {
  const [tab, settab] = useState(0);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: "0.2" }}>
        <nav className="nav nav-pills nav-fill flex-column p-5">
          <button
            className={`nav-link ${tab === 0 && "active"}`}
            onClick={() => {
              settab(0);
            }}
          >
            Profile
          </button>
          <button
            className={`nav-link ${tab === 1 && "active"}`}
            onClick={() => {
              settab(1);
            }}
          >
            Result
          </button>
        </nav>
      </div>
      <div
        style={{
          flex: "0.8",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        {tab === 0 ? (
          <div
            className="shadow"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "2rem 0rem",
            }}
          >
            <h2>Profile</h2>
            <div style={{ width: "60%" }}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={props.userData.email}
                  disabled
                  // onChange={(e) => props.setemail(e.target.value)}
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  value={props.newPassword}
                  onChange={(e) => props.setnewPassword(e.target.value)}
                />
                <label for="floatingInput">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  value={props.confirPassword}
                  onChange={(e) => props.setconfirPassword(e.target.value)}
                />
                <label for="floatingInput">Conform Password</label>
              </div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={(e) => props.changePassword(e)}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {props.results?.length > 0 ? (
              props.results?.map((result, index) => (
                <div
                  key={index}
                  className="card shadow"
                  style={{ width: "38rem", marginBottom: "1rem" }}
                >
                  <div
                    className="card-header"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5 className="">{result.code}</h5>
                    <h6 style={{display:"flex"}}>
                      <h6
                        className={
                          result.score > 0 ? "text-success" : "text-danger"
                        }
                      >
                        {result.score}
                      </h6>
                      /{result?.outOf}
                    </h6>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="card-title">{result.title}</h5>
                      <p className="card-text">
                        {moment(result.startDate).format("Do, MMM h:mm a")}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="card-text">{result.company}</p>
                      <p className="card-text" style={{ color: "gray" }}>
                        {result.type}
                      </p>
                    </div>
                    {/* <button
                      className="btn btn-primary"
                      disabled={props.tab === 2 ? true : false}
                      onClick={() => {
                          props.SeeQustion(result.questions);
                      }}
                    >
                      See Questions
                    </button> */}
                  </div>
                </div>
              ))
            ) : (
              <h4>{props.msg}</h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
