import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import logo from "./images/netflix-logo1svg.png";
import "./login.css";
import {Snackbar,Alert, Stack} from "@mui/material"

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }

    setOpen(false);
  };

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
      setError("Login process is not done!!");
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
        <img className="logo" src={logo} alt="NETFLIX-Logo" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email.." onChange={(e)=>setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password.." onChange={(e)=>setPassword(e.target.value)} required/>
          <button className="loginButton" onClick={handleLogin} >Sign In</button>
          <span>
            New to Netflix? <a href="/register"><b>Sign up now.</b></a>
          </span>
          <span>
            
          </span>
        </form>
      </div>
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
  )
}

export default Login
