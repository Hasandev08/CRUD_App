import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../../utils/api";

import "./style.css";

const Table = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  console.log(userData);

  const getData = async (e) => {
    const res = await callApi("get", "table", {
      "Content-Type": "application/json",
    });
    const data = await res.json();

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
    const res = await callApi("delete", `delete/${id}`, {
      "Content-Type": "application/json",
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (
            <tr key={index.toString()}>
              <th>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.country}</td>
              <td>{item.email}</td>
              <td className="function_buttons">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate(`/edit/${item._id}`)}
                >
                  Edit
                </button>
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
