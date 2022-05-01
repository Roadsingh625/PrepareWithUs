import React from "react";
import Filter from "../../../Component/Filter";
import moment from 'moment'
export default function Quiz(props) {
  return (
    <div className="container-fuild">
      <Filter tab={props.tab} setTab={props.setTab} handleSearch={props.handleFilter} search={props.search} placeHolder={"Search Quiz"}/>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            flex: "8",
            marginLeft: "2rem",
            display: "grid",
            placeItems: "center",
          }}
        >
          {props.quizs.length > 0 ? (
            props.quizs.map((quiz) => (
              <div
                key={quiz._id}
                className="card shadow"
                style={{ width: "38rem", marginBottom: "1rem" }}
              >
                <h5 className="card-header">{quiz.code}</h5>
                <div className="card-body">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5 className="card-title">{quiz.name}</h5>
                    <p className="card-text">
                      {moment(quiz.startDate).format("Do, MMM h:mm a")}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="card-text">{quiz.company}</p>
                    <p className="card-text" style={{ color: "gray" }}>
                      {quiz.type}
                    </p>
                  </div>

                
                  <button
                    className="btn btn-primary"
                    disabled={props.tab === 2 ? true :(props.tab==1&& moment()<moment(quiz.startDate))?true:false}
                    onClick={()=>{
                      if(moment().format("h:mm")>=moment(quiz.startDate).format("h:mm")&& moment().format("h:mm")<=moment(quiz.startDate).add(quiz.duration,"hour").format("h:mm"))
                      {
                        props.fetchQuestion(quiz._id)
                      }
                      else{
                        props.SeeQustion(quiz.questions)
                      }
                    }}
                  >
                    See Questions
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h4>{props.msg}</h4>
          )}
        </div>

        <div style={{ flex: "4"}}>
          <div className="card shadow" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Filter</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="aptitude"
                    id="defaultCheck1"
                    checked={props.type==="aptitude"?true:false}
                    onChange={e=>{
                      props.settype(e.target.value)
                    }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Aptitude
                  </label>
                </div>
              </li>
              <li className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="softskill"
                    id="defaultCheck2"
                    checked={props.type==="softskill"?true:false}
                    onChange={e=>{
                      props.settype(e.target.value)
                    }}
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    SoftSkill
                  </label>
                </div>
              </li>
              <li className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="coding"
                    id="defaultCheck3"
                    checked={props.type==="coding"?true:false}
                    onChange={e=>{
                      props.settype(e.target.value)}}
                  />
                  <label className="form-check-label" for="defaultCheck3">
                    Coding
                  </label>
                </div>
              </li>
            </ul>
            <div className="card-body">
              {/* <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Search By Company"
              /> */}
              <div className="text-center mt-2">
                <button className="btn btn-primary" onClick={()=>props.fecthQuiz()}>
                  {"Search "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
