import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const Edit = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    age: "",
    country: "",
    email: "",
  });

  console.log("The values are", values);

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

  const { id } = useParams("");
  console.log(id);

  const getData = async (e) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/table/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      setValues(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  const countryRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;

  const updateUser = async (e) => {
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
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/edit/${id}`, {
        method: "PATCH",
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

      if (res.status === 422 || !data) {
        console.log("Error");
      } else {
        navigate("/table");
        console.log("Data Edited successfully");
      }
    }
  };

  return (
    <div className="edit-form">
      <form className="form-inner">
        <div className="form-input">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={setData}
              value={values.name}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="number"
              className="form-control"
              name="age"
              onChange={setData}
              value={values.age}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              name="country"
              onChange={setData}
              value={values.country}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={setData}
              value={values.email}
            />
          </div>
        </div>
        <button type="submit" className="edut-button" onClick={updateUser}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
