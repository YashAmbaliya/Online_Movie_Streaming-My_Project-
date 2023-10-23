import React, { useContext, useState } from 'react'
import "./user.css"
import {PermIdentity,
    MailOutline,
    Publish,
    CalendarMonth,
    Update} from "@mui/icons-material"
import {useLocation} from "react-router-dom"
import {UserContext} from "../../context/userContext/UserContext"
import {updateUser} from "../../context/userContext/apiCalls"
import {Snackbar,Alert, Stack} from "@mui/material"
import {useSnackbar} from "notistack"
import storage from '../../firebase';

function User() {

    const [updatedUser, setUpdatedUser] = useState(null);
    const [profilePic, setProfilePic] = useState();
    const [uploaded, setUploaded] = useState(0);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const {dispatch} = useContext(UserContext);

    const location = useLocation();
    const user = location.state;

    const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedUser({...updatedUser, [e.target.name] : value});
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
                        setUpdatedUser((prev) => {
                            return {...prev, [item.label]: url};
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    console.log(uploaded);

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

    console.log(updatedUser);

    const handleUpdate = (e) => {
        e.preventDefault();
        try {
            setError("");
            updateUser(user._id, updatedUser, dispatch);
            setOpen(true);
            setMessage("User Data Updated!!");
        } catch (error) {
            setOpen(true);
            setError("User Data Not Updated!!");
        }
    };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
        <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
            <div className="userShowTop">
                <img src={user.profilePic || defaultAvatar} alt="Profile-pic" className="userShowImg"/>
                <div className="userShowTopTitle">
                    <div className="userShowUsername">{user.username}</div>
                    <div className="userShowUserTitle">NETFLIX {user.isAdmin ? "Admin" : "Premium User"}</div>
                </div>
            </div>
            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <PermIdentity className="userShowIcon"/>
                    <span className="userShowInfoTitle">{user._id}</span>
                </div>
                <div className="userShowInfo">
                    <PermIdentity className="userShowIcon"/>
                    <span className="userShowInfoTitle"> Is Admin : {user.isAdmin ? "Yes" : "No"}</span>
                </div>
                {/* <div className="userShowInfo">
                    <CalendarToday className="userShowIcon"/>
                    <span className="userShowInfoTitle">23.09.2001</span>
                </div> */}
                <span className="userShowTitle">Contact Details</span>
                {/* <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon"/>
                    <span className="userShowInfoTitle">+91 99250 82857</span>
                </div> */}
                <div className="userShowInfo">
                    <MailOutline className="userShowIcon"/>
                    <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                    <CalendarMonth className="userShowIcon"/>
                    <span className="userShowInfoTitle">{user.createdAt}</span>
                </div>
                <div className="userShowInfo">
                    <Update className="userShowIcon"/>
                    <span className="userShowInfoTitle">{user.updatedAt}</span>
                </div>
            </div>
        </div>
        <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
                <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label>Full Name</label>
                        <input type="text" name="username" placeholder={user.username.toString()} className="userUpdateInput" onChange={handleChange}/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Email-Id</label>
                        <input type="text" name="email" placeholder={user.email.toString()} className="userUpdateInput" onChange={handleChange}/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Is Admin ?</label>
                        <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>                  
                </div>
                <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                        <img src={user.profilePic || defaultAvatar} alt="Upload-Img" className="userUpdateImg"/>
                        <label htmlFor="profilePic"><Publish className="userUpdateIcon"/></label>
                        <input type="file" id="profilePic" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} style={{display: "none"}}/>
                    </div>
                    {uploaded === 1 ? (
                        <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
                    ) : (
                        <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
                    )}  
                </div>
            </form>
        </div>
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

export default User
