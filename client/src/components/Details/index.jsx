import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

const Details = () => {
  const [userData, setUserData] = useState([]);

  const { id } = useParams("");

  const getData = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/table/${id}`, {
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

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome</h1>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="view col-lg-6 col-md-6 col-12">
            <h4 className="mt-3">
              Name: <span>{userData.name}</span>
            </h4>
            <h4 className="mt-3">
              Age: <span>{userData.age}</span>
            </h4>
            <h4 className="mt-3">
              Country: <span>{userData.country}</span>
            </h4>
            <h4 className="mt-3">
              Email: <span>{userData.email}</span>
            </h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
