import React from 'react'

export default function ForgetPassword(props) {
  return (
    <main className="main text-center">
      <form className="form-signin" style={{ width: "40%" }}>
        <h1 className="h3 mb-3 fw-normal">Forget Password</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={props.email}
            onChange={e=>props.setemail(e.target.value)}
          />
          <label for="floatingInput">Email address</label>
          
        </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e)=>props.handleForgetPassword(e)}>
          Forget Password
        </button>
      </form>
    </main>
  )}
