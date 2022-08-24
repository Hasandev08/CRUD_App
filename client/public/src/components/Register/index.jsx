import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    age: "",
    country: "",
    email: "",
  });

  const [input] = useState([
    {
      label: "Name",
      name: "name",
      values: values.name,
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      values: values.age,
    },
    {
      label: "Country",
      name: "country",
      values: values.country,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      values: values.email,
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

  const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  const countryRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;

  const addData = async (e) => {
    e.preventDefault();

    const { name, age, country, email } = values;
    if (!name) {
      alert("Please enter your name");
    } else if (!nameRegex.test(name)) {
      alert("Please enter a valid name");
    } else if (name.length < 3 || name.length > 50) {
      alert("The length of name should be between 3 and 50");
    } else if (!age) {
      alert("Please enter age");
    } else if (age <= 10 || age >= 100) {
      alert("The age should be betweeen 10 and 99");
    } else if (!country) {
      alert("Please enter country");
    } else if (!countryRegex.test(country)) {
      alert("Please enter alpha characters");
    } else if (!email) {
      alert("Please enter email");
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
    } else if (email.length <= 5 || email.length >= 255) {
      alert("The characters of email should be between 5 and 255");
    } else {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          country,
          email,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 404 || !data) {
        console.log("Error");
      } else {
        navigate("/table");
        console.log("Data added successfully");
      }
    }
  };

  return (
    <div className="register-form">
      <form method="POST" className="form-inner">
        <div className="form-input">
          {input.map((item, index) => (
            <div
              key={index.toString()}
              className="mb-3 col-lg-6 col-md-6 col-12"
            >
              <input
                type={item.type || "text"}
                className="form-control"
                name={item.name}
                placeholder={item.label}
                onChange={setData}
                // value={item.values}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="button" onClick={addData}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Register;
