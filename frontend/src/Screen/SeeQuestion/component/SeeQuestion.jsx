import React from "react";

export default function SeeQuestion(props) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 5,
          height: "90vh",
        }}
      >
        <div style={{padding:"2rem"}}>
        {props.questions.map((ques,index)=>(
          <button className="btn btn-primary" style={{borderRadius:"100%",margin:"0.5rem 1rem"}} onClick={()=>{
            props.setquestion(ques)
          }}>{index+1}</button>
        ))
      }
        </div>
      </div>
      <div
        style={{
          flex: 5,
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div className="shadow rounded" style={{display:"flex",flexDirection:"column",width:"80%",padding:"1rem"}}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.question?.title}
                disabled
              />
              <label for="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props?.question?.options[0]?props?.question?.options[0]:""}
                disabled
              />
              <label for="floatingInput">option 1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props?.question?.options[1]?props?.question?.options[1]:""}
                disabled
              />
              <label for="floatingInput">option 2</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props?.question?.options[2]?props?.question?.options[2]:""}
                disabled
              />
              <label for="floatingInput">option 3</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props?.question?.options[3]?props?.question?.options[3]:""}
                disabled
              />
              <label for="floatingInput">option 4</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.question?.ans}
                disabled
              />
              <label for="floatingInput">Answer</label>
            </div>
          </div>
      </div>
    </div>
  );
}
