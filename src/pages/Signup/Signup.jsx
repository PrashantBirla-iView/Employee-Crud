import "../Signup/Signup.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

const SignUpSchema = Yup.object().shape({
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

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const history = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        axios.post("http://localhost:3005/user", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("User name", values.name);
        history("/Login");
        toast.success("Signup Successfull!!", {
          style: { fontSize: "14px" },
        });
        action.resetForm();
      },
    });

  return (
    <div className="main-login">
      <div className="signup-box">
        <div className="signup-heading">
          <h2>
            <b>SignUp</b>
          </h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="signup-input">
            <fieldset>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <span style={{ color: "red" }}>{errors.name}</span>
              ) : null}
            </fieldset>
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
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
