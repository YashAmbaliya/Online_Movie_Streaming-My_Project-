import React, { useContext, useState} from 'react'
import { createUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import "./newUser.css"
import {Snackbar,Alert, Stack} from "@mui/material"
import {useSnackbar} from "notistack"
import storage from "../../firebase"

function NewUser() {

    const [newAdmin, setNewAdmin] = useState(null);
    const [profilePic, setProfilePic] = useState();
    const [uploaded, setUploaded] = useState(0);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const {dispatch} = useContext(UserContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setNewAdmin({...newAdmin, [e.target.name]: value});
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/profiles/${fileName}`).put(item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done.");
                    enqueueSnackbar("Upload is " + progress + "% done.", {variant: 'success'});
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        setNewAdmin((prev) => {
                            return {...prev, [item.label]: url};
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([{file: profilePic, label: "profilePic"}]);
    };

    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }

        setOpen(false);
    };

    console.log(newAdmin);

    const handleCreate = (e) => {
        e.preventDefault();
        try {
            if(newAdmin.username === undefined || newAdmin.username === ""){
                setOpen(true);
                setError("Username is required!!!")
            }
            else if(newAdmin.email === undefined || newAdmin.email === ""){
                setOpen(true);
                setError("Email is required!!!")
            }
            else if(newAdmin.password === undefined || newAdmin.password === ""){
                setOpen(true);
                setError("Password is required!!!");
            }
            else if(newAdmin.isAdmin === undefined || newAdmin.isAdmin === ""){
                setOpen(true);
                setError("Admin Selection is required!!!");
            }
            else if(newAdmin.profilePic === undefined || newAdmin.profilePic === ""){
                setOpen(true);
                setError("User Profile Picture is required!!!");
            }else{
                setError("");
                createUser(newAdmin, dispatch);
                setOpen(true);
                setMessage("New User Is Created!!");
            }

        } catch (error) {
            setOpen(true);
            setError("You can't submit Empty Form!!");
        }
    };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter Username.." onChange={handleChange} required/>
        </div>
        {/* <div className="newUserItem">
            <label>Full Name</label>
            <input type="text" placeholder="Yash Ambaliya" />
        </div>
        <div className="newUserItem">
            <label>Address</label>
            <input type="text" placeholder="Gujarat | India" />
        </div>
        <div className="newUserItem">
            <label>Phone</label>
            <input type="text" placeholder="+91 99250 82857" />
        </div> */}
        {/* <div className="newUserItem">
            <label>Gender</label>
            <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male"/>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female"/>
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other"/>
            <label for="other">Other</label>
            </div>
        </div> */}
        <div className="newUserItem">
            <label>Email-Id</label>
            <input type="email" name="email" placeholder="Enter Email.." onChange={handleChange} required />
        </div>
        <div className="newUserItem">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Password.." onChange={handleChange} required />
        </div>
        <div className="newUserItem">
            <label>Is Admin</label>
            <select name="isAdmin" id="isAdmin" className="newUserSelect" onChange={handleChange} required >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div className="newUserItem">
            <label>Profile Picture</label>
            <input type="file" id="profilePic" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} required />
        </div>
        {uploaded === 1 ? (
            <button className="newUserButton" onClick={handleCreate}>Create</button>
        ) : (
            <button className="newUserButton" onClick={handleUpload}>Upload</button>
        )}   
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
  )
}

export default NewUser;
