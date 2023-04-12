import React from "react";
import "../Login/Login.css";

function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="main">
          <div className="login-box">
            <div className="login-heading">
              <h2>Login</h2>
            </div>
            <div className="login-input">
              <fieldset>
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email" />
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password" />
              </fieldset>
            </div>
            <div className="login-btn">
              <button type="button" class="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
