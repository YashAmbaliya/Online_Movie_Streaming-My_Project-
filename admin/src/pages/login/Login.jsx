import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import "./login.css";
import {AuthContext} from "../../context/authContext/AuthContext";
import {login} from "../../context/authContext/apiCalls";
import {Snackbar,Alert, Stack} from "@mui/material"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isFetching, dispatch} = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        try {
          if(email === undefined || email === ""){
            setOpen(true);
            setError("Email is required!!!")
          }else if(password === undefined || password === ""){
            setOpen(true);
            setError("Password is required!!!");
          }else{
            setError("");
            login({email, password}, dispatch);
            setOpen(true);
            setMessage("User Login Successfull!!");
          }
        } catch (error) {
          setOpen(true);
          setError("You can't submit Empty Form!!");
        }
    };

    const handleClose = (event, reason) => {
      if(reason === "clickaway"){
          return;
      }

      setOpen(false);
  };

  return (
    <>
    <div className="topbar1">
      <div className="topbarWrapper1">
        <div className="topLeft1">
            {/* <span className="logo1">NETFLIX  Admin</span> */}
        </div>
        <div className="topRight1">
          <span className="logo2"> Welcome To Admin App</span>
        </div>
      </div>
    </div>
    <div className="login">
      <form className="loginForm">
        <h1 className="loginTitle">Sign In</h1>
        <input type="text" placeholder="Email..." className="loginInput" onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password..." className="loginInput" onChange={(e) => setPassword(e.target.value)} required/>
        <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Login</button>
      </form>
      <Stack sx={{width: "100%"}} spacing={2}>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} >
                {error ?
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {error}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="success" variant="filled">
                        {message}
                    </Alert>
                }
            </Snackbar>
        </Stack>
    </div>
    </>
  )
}

export default Login;
