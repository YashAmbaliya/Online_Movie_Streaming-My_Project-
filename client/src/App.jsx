import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext);

  return (
    <Router>
    <Routes>
      <Route exact path="/"
        element={user ? <Home /> : <Navigate to="/register"/>}
      />
      <Route path="/register"
        element={!user ? <Register /> : <Navigate to="/"/>}
      />
      <Route path="/login"
        element={!user ?<Login /> : <Navigate to="/"/>}
      />
      {user && (
      <>
        <Route path="/movies"
          element={<Home type="movies"/>}
        />
        <Route path="/series"
          element={<Home type="series"/>}
        />
        <Route path="/watch"
          element={<Watch />}
        />
      </>
      )}
    </Routes>
    </Router>
  );
}

export default App;

