import { useState } from "react";
import Login from "./components/Login";
import Table from "./components/Table";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <div className="routers">
        <Routes>
          {token && <Route path="/edit/:id" exact element={<Edit />} />}
          {token && <Route path="/details/:id" exact element={<Details />} />}
          {token && <Route path="/table" exact element={<Table />} />}
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Login setToken={setToken} />} />
        </Routes> 
      </div>
    </div>
  );
}

export default App;
