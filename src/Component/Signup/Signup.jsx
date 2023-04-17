import React, { useEffect, useState } from "react";
import "../Signup/Signup.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isUserExist, setIsUserExist] = useState(false);
  const [existingUsers, setexistingUsers] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3005/user");
    setexistingUsers(result.data);
  };

  useEffect(() => {
    existingUsers.find((user) => {
      if (user.email === userEmail) {
        setIsUserExist(true);
      } else {
        setIsUserExist(false);
      }
      return;
    });
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
      .catch((err) => {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setCurrentErrors(errors);
      });
    return;
  }, [userName, userEmail, userPassword, confirmUserPassword]);

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
        localStorage.setItem("User name", userName);
        history("/Login");
        toast.success("Signup Successfull!!", {
          style: { fontSize: "14px" },
        });
        // setuserData(valid);
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
                <span style={{ color: "red" }}>{currentErrors.name}</span>
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
                <span style={{ color: "red" }}>{currentErrors.email}</span>
              )}
              {isUserExist && (
                <span style={{ color: "red" }}>*User Already Exist.</span>
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
                <span style={{ color: "red" }}>{currentErrors.password}</span>
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
                <span style={{ color: "red" }}>
                  {currentErrors.confirmPassword}
                </span>
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
