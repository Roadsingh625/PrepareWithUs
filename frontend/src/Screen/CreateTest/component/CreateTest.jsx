import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import DateTimePicker from "react-datetime-picker";
export default function CreateTest(props) {
  const [showMSG, setshowMSG] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showMSG && (
        <SweetAlert
          danger
          onConfirm={() => {
            setshowMSG(false);
          }}
        >
          {"Please Enter Proper Data"}
        </SweetAlert>
      )}
      {/* <h3>TEST</h3> */}
      <div
        style={{
          width: "40%",
          padding: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#fff",
          marginTop: "2rem",
        }}
        className="shadow"
      >
        {props.test.add_ques ? (
          <>
            <h6>
              Q: {props.questionCnt.current}/{props.test?.num_ques}
            </h6>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.question?.title}
                required
                onChange={(e) =>
                  props.setquestion({
                    ...props.question,
                    title: e.target.value,
                  })
                }
              />
              <label for="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.opt1}
                required
                onChange={(e) => props.setopt1(e.target.value)}
              />
              <label for="floatingInput">option 1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.opt2}
                required
                onChange={(e) => props.setopt2(e.target.value)}
              />
              <label for="floatingInput">option 2</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.opt3}
                required
                onChange={(e) => props.setopt3(e.target.value)}
              />
              <label for="floatingInput">option 3</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.opt4}
                required
                onChange={(e) => props.setopt4(e.target.value)}
              />
              <label for="floatingInput">option 4</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.question?.ans}
                required
                onChange={(e) =>
                  props.setquestion({ ...props.question, ans: e.target.value })
                }
              />
              <label for="floatingInput">Answer</label>
            </div>
            {props.questionCnt.current === props.test.num_ques ? (
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() => {
                  props.submitQuestion();
                }}
              >
                Submit Question
              </button>
            ) : (
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() => {
                  props.addQuestion();
                }}
              >
                Add Question
              </button>
            )}
          </>
        ) : (
          <>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.test?.title}
                required
                onChange={(e) =>
                  props.settest({ ...props.test, title: e.target.value })
                }
              />
              <label for="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.test?.code}
                required
                onChange={(e) =>
                  props.settest({ ...props.test, code: e.target.value })
                }
              />
              <label for="floatingInput">Code</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.test?.desc}
                required
                onChange={(e) =>
                  props.settest({ ...props.test, desc: e.target.value })
                }
              />
              <label for="floatingInput">Desc</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.test?.num_ques}
                required
                onChange={(e) => {
                  props.settest({
                    ...props.test,
                    num_ques: Number(e.target.value),
                  });
                }}
              />
              <label for="floatingInput">Number Of Questions</label>
            </div>
            <div className="form-floating mb-3">
              <DateTimePicker
                value={props.test?.startDate}
                onChange={(e) => {
                  props.settest({
                    ...props.test,
                    startDate: e,
                  });
                }}
                minDate={new Date()}
                clearIcon={null}
              />
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={props.test?.duration}
                required
                onChange={(e) => {
                  props.settest({
                    ...props.test,
                    duration: Number(e.target.value),
                  });
                }}
              />
              <label for="floatingInput">Duration (min)</label>
            </div>
            <div className="mb-3" style={{display:"flex",justifyContent:"space-evenly"}}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value={"softskill"}
                  onChange={(e) =>
                    props.settest({ ...props.test, type: e.target.value })
                  }
                  checked={props.test.type === "softskill" ? true : false}
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  Soft Skill
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value={"aptitude"}
                  onChange={(e) =>
                    props.settest({ ...props.test, type: e.target.value })
                  }
                  checked={props.test.type === "aptitude" ? true : false}
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  Aptitude
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value={"coding"}
                  onChange={(e) =>
                    props.settest({ ...props.test, type: e.target.value })
                  }
                  checked={props.test.type === "coding" ? true : false}
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  Coding
                </label>
              </div>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={() => {
                if (
                  props.test.num_ques <= 30 &&
                  props.test.num_ques >= 1 &&
                  props.test.duration >= 30
                )
                  props.settest({ ...props.test, add_ques: true });
                else setshowMSG(true);
              }}
            >
              Create
            </button>
          </>
        )}
      </div>
    </div>
  );
}
