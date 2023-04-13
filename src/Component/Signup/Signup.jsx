import React, { useState } from "react";
import "../Signup/Signup.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Email address is not valid*")
    .required("*Email is required"),
  password: Yup.string()
    .required("*Password is required")
    .min(8, "*Password must be atleast 8 letter long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

function Signup() {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [confirmUserPassword, setconfirmUserPassword] = useState("");
  const [currentErrors, setCurrentErrors] = useState([]);
  const [userData, setuserData] = useState([]);

  const history = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    validationSchema
      .validate(
        {
          name: userName,
          email: userEmail,
          password: userPassword,
          confirmPassword: confirmUserPassword,
        },
        { abortEarly: false }
      )
      .then((valid) => {
        setCurrentErrors([]);

        const newUser = axios.post("http://localhost:3005/user", {
          name: userName,
          email: userEmail,
          password: userPassword,
        });
        setuserData((prev) => [...prev, newUser]);
        history("/Login");
        // setuserData(valid);
        // console.log("User Data", userData);
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
      <div className="signup-box">
        <div className="signup-heading">
          <h2>
            <b>SignUp</b>
          </h2>
        </div>
        <form className="form" onSubmit={handleSignUp}>
          <div className="signup-input">
            <fieldset>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) => setuserName(e.target.value)}
              />
              {currentErrors.name && (
                <div style={{ color: "red" }}>{currentErrors.name}</div>
              )}
            </fieldset>
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
            <fieldset>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={(e) => setconfirmUserPassword(e.target.value)}
              />
              {currentErrors.confirmPassword && (
                <div style={{ color: "red" }}>
                  {currentErrors.confirmPassword}
                </div>
              )}
            </fieldset>
          </div>
          <div className="signup-btn">
            <button type="submit" class="btn btn-primary">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
