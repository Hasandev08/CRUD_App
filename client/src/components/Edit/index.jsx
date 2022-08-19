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
        "Authorization": localStorage.getItem("token")
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

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, age, country, email } = values;

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
