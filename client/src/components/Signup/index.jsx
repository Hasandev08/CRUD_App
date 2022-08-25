import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/schemas/index";
import Alert from "@mui/material/Alert";
import "./style.css";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerData = async (values) => {
    const { name, age, country, email, password, cPassword } = values;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, country, email, password, cPassword }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 401) {
      setError(data.message);
      console.log(data.message);
    } else {
      navigate("/");
      console.log("Sign Up successful");
    }
  };

  const formik = useFormik({
    initialValues: { name: "", age: "", country: "", email: "", password: "", cPassword: "" },
    validateOnBlur: true,
    onSubmit: registerData,
    validationSchema: registerSchema,
  });

  return (
    <div className="signup-form">
      <form className="form-inner" onSubmit={formik.handleSubmit}>
        <div className="signup-form-input">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="register-errors">
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null}
            </span>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="register-errors">
              {formik.touched.age && formik.errors.age
                ? formik.errors.age
                : null}
            </span>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="register-errors">
              {formik.touched.country && formik.errors.country
                ? formik.errors.country
                : null}
            </span>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="register-errors">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </span>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="signup-errors">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </span>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
              <input
                type="password"
                className="form-control"
                name="cPassword"
                placeholder="Confirm Password"
                value={formik.values.cPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="signup-errors">
                {formik.touched.cPassword && formik.errors.cPassword
                  ? formik.errors.cPassword
                  : null}
              </span>
            </div>
        </div>
        <button type="submit" className="login-button">
          Sign Up
        </button>
        <div className="link">
          <Link to="/">Have an account already? Click here to login</Link>
        </div>
      </form>
      {error ? <Alert severity="error">{error}</Alert> : null}
    </div>
  );
}

export default Signup;
