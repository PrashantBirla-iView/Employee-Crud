import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validateLogin = Yup.object().shape({
  email: Yup.string()
    .email("*Email address is not valid*")
    .required("*Email is required"),
  password: Yup.string()
    .required("*Password is required")
    .min(8, "*Password must be atleast 8 letter long"),
});

function Login() {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [currentErrors, setCurrentErrors] = useState([]);
  const [userData, setUserData] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3005/user");
    setUserData(result.data);
  };

  console.log("User data", userData);

  const handleLogin = (e) => {
    e.preventDefault();

    validateLogin
      .validate(
        { email: userEmail, password: userPassword },
        { abortEarly: false }
      )
      .then((valid) => {
        userData.find((user) => {
          if (user.email === userEmail && user.password === userPassword) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("password", user.password);
            history("/Product");
          }
        });
      })
      .catch((err) => {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setCurrentErrors(errors);
      });
  };

  return (
    <div className="main-login">
      <div className="login-box">
        <div className="login-heading">
          <h2>
            <b>Login</b>
          </h2>
        </div>
        <form action="" className="form" onSubmit={handleLogin}>
          <div className="login-input">
            <fieldset>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setuserEmail(e.target.value)}
              />
              {currentErrors.email && (
                <div style={{ color: "red" }}>{currentErrors.email}</div>
              )}
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setuserPassword(e.target.value)}
              />
              {currentErrors.password && (
                <div style={{ color: "red" }}>{currentErrors.password}</div>
              )}
            </fieldset>
          </div>
          <div className="login-btn">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
