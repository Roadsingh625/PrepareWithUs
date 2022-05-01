import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Login(props) {
  return (
    <main className="main text-center">
      <form className="form-signin" style={{ width: "40%" }}>
        <h1 className="h3 mb-3 fw-normal">Login</h1>

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
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={props.password}
            onChange={e=>props.setpassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div style={{marginBottom:"10px",float:"right"}}>
            <a href='/forgetPassword'>Forget Password?</a>
          </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e)=>props.handelLogin(e)}>
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">
          <Link to="/register">Create new account</Link>
        </p>
      </form>
    </main>
  );
}
