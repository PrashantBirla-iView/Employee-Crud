import React, { useEffect, useState } from "react";
import "./Login.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const validateLogin = Yup.object().shape({
    email: Yup.string()
      .email("*Email address is not valid*")
      .required("*Email is required"),
    password: Yup.string().test("match", "Password is wrong", function (value) {
      let current_password;
      userData.find((user) => {
        if (user.password === value) {
          current_password = user.password;
        }
      });
      return value === current_password;
    }),
  });
  const [userData, setUserData] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3005/user");
    setUserData(result.data);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateLogin,
      onSubmit: (values) => {
        userData.find((user) => {
          if (
            user.email === values.email &&
            user.password === values.password
          ) {
            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            localStorage.setItem("password", user.password);

            history("/Product");
            toast.success(`Welcome ${user.name}`, {
              style: { fontSize: "14px" },
            });
          }
        });
      },
    });

  return (
    <div className="main-login">
      <div className="login-box">
        <div className="login-heading">
          <h2>
            <b>Login</b>
          </h2>
        </div>
        <form action="" className="form" onSubmit={handleSubmit}>
          <div className="login-input">
            <fieldset>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span style={{ color: "red" }}>{errors.email}</span>
              ) : null}
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <span style={{ color: "red" }}>{errors.password}</span>
              ) : null}
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
