import React from "react";
import "./ChangePassword.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().test(
    "match",
    "Current password is wrong",
    function (value) {
      const current_password = localStorage.getItem("password");
      return value === current_password;
    }
  ),
  newPassword: Yup.string()
    .required("*Password is required")
    .min(8, "*Password must be atleast 8 letter long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordSchema,
      onSubmit: (values, action) => {
        const userId = localStorage.getItem("id");
        console.log(values);
        axios
          .get(`http://localhost:3005/user/${userId}`)
          .then((res) => {
            const user = res.data;
            user.password = values.newPassword;
            axios
              .put(`http://localhost:3005/user/${userId}`, user)
              .then((res) => {
                console.log("User updated succefully", res.data);
              })
              .catch((err) => {
                console.log("Error", err);
              });
          })
          .catch((err) => {
            console.log("Error 2", err);
          });

        toast.success("Password Changed Successfully");
        action.resetForm();
      },
    });

  return (
    <div className="main-login">
      <div className="signup-box">
        <div className="signup-heading">
          <h2>
            <b>Change Password</b>
          </h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="signup-input">
            <fieldset>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Current Password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.currentPassword && touched.currentPassword ? (
                <span style={{ color: "red" }}>{errors.currentPassword}</span>
              ) : null}
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.newPassword && touched.newPassword ? (
                <span style={{ color: "red" }}>{errors.newPassword}</span>
              ) : null}
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <span style={{ color: "red" }}>{errors.confirmPassword}</span>
              ) : null}
            </fieldset>
          </div>
          <div className="signup-btn">
            <button type="submit" class="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
