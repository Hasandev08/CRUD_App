import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/schemas/index";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./style.css";

function Login({ setToken }) {
  const [error, setError] = useState(null);
  const [checkError, setCheckError] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const navigate = useNavigate();

  const login = async (values) => {
    const { email, password } = values;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      setError(data.message);
      setCheckError(true);
    } else {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setCheckError(false);
        setCheckUser(true);
        setTimeout(() => {
          navigate("/table");
        }, 2000);
        console.log("Logged in successful");
      } else {
        console.log("Error");
      }
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit: login,
    validationSchema: loginSchema,
  });

  return (
    <div className="login-form">
      <form className="form-inner" onSubmit={formik.handleSubmit}>
        <div className="email-form-input">
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
            <span className="login-errors">
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
            <span className="login-errors">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </span>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="link">
          <Link to="/register">
            Don't have an account? Click here to register
          </Link>
        </div>
      </form>
      {checkError && <Alert severity="error">{error}</Alert>}
      {checkUser && <Alert severity="success">Logged In Successfuly</Alert>}
    </div>
  );
}

export default Login;
