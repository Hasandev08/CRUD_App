import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../../utils/api";
import Modal from "../Modal/index";
import "./style.css";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const navigate = useNavigate();

  const getTableData = async (e) => {
    const res = await callApi("get", "table", {
      "Content-Type": "application/json",
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      setTableData(data);
      console.log(data)
      console.log("Data displayed successfully");
    }
  };

  useEffect(() => {
    getTableData();
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
      getTableData();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Modal
        open={openModal}
        tableData={selectedRow}
        deleteUser={deleteUser}
        setOpenModal={setOpenModal}
      />
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
            {tableData.map((item, index) => (
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
                    onClick={() =>
                      navigate(`/edit/${item._id}`, { state: { data: item } })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedRow(item);
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
