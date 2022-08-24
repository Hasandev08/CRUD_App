import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Table = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  console.log(userData);

  const getData = async (e) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/table`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      setUserData(data);
      console.log("Data displayed successfully");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      console.log("Data deleted successfully");
      getData();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="table-buttons">
        <Link to="/register">
          <button type="button" className="btn btn-primary">
            Add User
          </button>
        </Link>
        <button type="button" className="btn btn-primary" onClick={handleLogOut}>
          Logout
        </button>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="row">
          {userData.map((item, index) => (
            <tr key={index.toString()}>
              <th>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.country}</td>
              <td>{item.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate(`/edit/${item._id}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
