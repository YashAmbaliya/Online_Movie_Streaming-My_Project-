import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import logo from "./images/netflix-logo1svg.png";
import "./register.css";
import {Snackbar,Alert, Stack} from "@mui/material"

function Register() {

  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
 
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleStart = () => {
    if(email1 === undefined || email1 === ""){
      setOpen(true);
      setError("Email is required!!!")
    }else{
      setEmail(email1);
    }
  };

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }

    setOpen(false);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      if(username === undefined || username === ""){
        setOpen(true);
        setError("Username is required!!!")
      }else if(password === undefined || password === ""){
        setOpen(true);
        setError("Password is required!!!");
      }else{
        setError("");
        await axios.post("auth/register", {username, email, password});
        setOpen(true);
        setMessage("Registration Successfull!!");
        navigate("/login");
      }
    } catch (error) {
      setOpen(true);
      setError("Login process is not done!!");
    }
  };

  console.log(email, password, username);

  return (
    <>
    <div className="register">
      <div className="top">
        <div className="wrapper">
        <img className="logo" src={logo} alt="NETFLIX-Logo" />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        {!email ? ( 
              <div className="input">
                  <input type="email" placeholder="Email.. Ex: abc@gmail.com" onChange={(e) => setEmail1(e.target.value)}/>
                  <button className="registerButton" onClick={handleStart}>Get Started</button>
              </div>
        ) : ( 
              <form className="input">
                  <input type="username" placeholder="Username.." onChange={(e) => setUsername(e.target.value)}/>
                  <input type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)}/>
                  <button className="registerButton" onClick={handleFinish}>Start</button>
              </form>
        )}
        <p className="pTag">Already have an account!!<a href="/login" className="loginLink"><b>Sign In.</b></a></p>
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
    </>
  )
}

export default Register
