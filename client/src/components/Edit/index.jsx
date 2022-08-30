import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { editSchema } from "../../utils/schemas/index";
import Alert from "@mui/material/Alert";
import "./style.css";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = location.state;

  const [checkUser, setCheckUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(data.isAdmin);

  const { id } = useParams("");

  const updateUser = async (values) => {
    const { name, age, country, email, isAdmin } = values;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        age,
        country,
        email,
        isAdmin,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      setCheckUser(true);
      setTimeout(() => {
        navigate("/table");
      }, 2000);
      console.log("Data Edited successfully");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: data.name,
      age: data.age,
      country: data.country,
      email: data.email,
      isAdmin,
    },
    validateOnBlur: true,
    onSubmit: updateUser,
    validationSchema: editSchema,
  });

  return (
    <div className="edit-form">
      <form className="form-inner" onSubmit={formik.handleSubmit}>
        <div className="form-input">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="edit-errors">
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
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="edit-errors">
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
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="edit-errors">
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="edit-errors">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </span>
          </div>
        </div>
        <div className="form-check">
          {isAdmin ? (
            <input
              type="checkbox"
              name="isAdmin"
              value={formik.values.isAdmin}
              checked
              onClick={(e) => setIsAdmin(e.target.checked)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          ) : (
            <input
              type="checkbox"
              name="isAdmin"
              value={formik.values.isAdmin}
              onClick={(e) => setIsAdmin(e.target.checked)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
          <label> Is Admin? </label>
        </div>
        <button type="submit" className="edit-button">
          Edit
        </button>
      </form>
      {checkUser && <Alert severity="success">User Edited Successfully</Alert>}
    </div>
  );
};

export default Edit;
//<Alert severity="success">This is a success alert — check it out!</Alert>
