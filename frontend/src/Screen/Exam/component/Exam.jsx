import React from "react";

export default function Exam(props) {
  return (
    <div className="container-fuild">
      <div
        style={{
          padding: "0.5rem 5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", }}>
          <h6 style={{marginRight:"5px"}}>Start Time:</h6>
          <h6 className="text-primary">{props.time.startTime}</h6>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h6 style={{marginRight:"5px"}}>End Time:</h6>
          <h6 className="text-danger">{props.time.endTime}</h6>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5vh" }}
      >
        <div
          className="shadow rounded"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            padding: "1rem",
            height: "60vh",
            width: "80vh",
          }}
        >
          <div className="form-floating mb-3">
            <h6>
              Q: {props.index + 1}/{props.questions.length}{" "}
              {props.questions[props.index]?.title}
            </h6>
          </div>
          {console.log(props.questions, props.index)}
          <div className="mb-3" style={{}}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={props.questions[props.index]?.options[0]}
                onChange={(e) => props.setans(e.target.value)}
                checked={
                  props.ans === props.questions[props.index]?.options[0]
                    ? true
                    : false
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                {props.questions[props.index]?.options[0]}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={props.questions[props.index]?.options[1]}
                onChange={(e) => props.setans(e.target.value)}
                checked={
                  props.ans === props.questions[props.index]?.options[1]
                    ? true
                    : false
                }
              />
              <label className="form-check-label" for="flexRadioDefault2">
                {props.questions[props.index]?.options[1]}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                value={props.questions[props.index]?.options[2]}
                onChange={(e) => props.setans(e.target.value)}
                checked={
                  props.ans === props.questions[props.index]?.options[2]
                    ? true
                    : false
                }
              />
              <label className="form-check-label" for="flexRadioDefault3">
                {props.questions[props.index]?.options[2]}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                value={props.questions[props.index]?.options[3]}
                onChange={(e) => props.setans(e.target.value)}
                checked={
                  props.ans === props.questions[props.index]?.options[3]
                    ? true
                    : false
                }
              />
              <label className="form-check-label" for="flexRadioDefault4">
                {props.questions[props.index]?.options[3]}
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleAns();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
