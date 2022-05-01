import React from 'react'

export default function RestPassword(props) {
  return (
    <main className="main text-center">
      <form className="form-signin" style={{ width: "40%" }}>
        <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={props.details?.password}
            onChange={e=>props.setDetails({
              ...props.details,
              password:e.target.value
            })}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={props.details?.passwordCon}
            onChange={e=>props.setDetails({
              ...props.details,
              passwordCon:e.target.value
            })}
          />
          <label for="floatingPassword">Conform Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e)=>props.handleResetPassword(e)}>
          Rest Passowrd
        </button>
      </form>
    </main>
  )
}
