import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [input] = useState([
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      values: values.firstName,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      values: values.lastName,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      values: values.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      values: values.password,
    },
  ]);

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setValues((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  const registerData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = values;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("Error");
    } else {
      navigate("/");
      console.log("Sign Up successful");
    }
  };

  return (
    <div className="signup-form">
      <form className="form-inner">
        <div className="form-input">
          {input.map((item, index) => (
            <div
              key={index.toString()}
              className="mb-3 col-lg-6 col-md-6 col-12"
            >
              <input
                type={item.type}
                className="form-control"
                name={item.name}
                placeholder={item.label}
                onChange={setData}
                // value={item.values}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="login-button" onClick={registerData}>
          Sign Up
        </button>
        <div className="link">
          <Link to="/">Have an account already? Click here to login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
