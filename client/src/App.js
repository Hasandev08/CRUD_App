import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Table from "./components/Table";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="routers">
        <Routes>
          <Route path="/edit/:id" exact element={<Edit />} />
          <Route path="/details/:id" exact element={<Details />} />
          <Route path="/table" exact element={<Table />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
