import React from 'react'
import netflixLogo from "./images/netflix-logo1svg.png"
// import profile from "./images/profile.jpg"
import "./navbar.css"
import { ArrowDropDown, Search } from '@material-ui/icons'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext/AuthContext'
import { logout } from '../../context/authContext/AuthAction'
import Popup from '../popup/Popup'
import localstorage from './localstorage'
import {UserContext} from '../../context/userContext/UserContext'
import {getUserById} from '../../context/userContext/apiCalls'
import { useEffect } from 'react'


function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext); 
    const [isOpen, setIsOpen] = useState(false);

    const {user, dispatch: dispatchUser} = useContext(UserContext)

    const data = localstorage()

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    console.log(user);

    useEffect(() => {
        const getUser = async () =>{
            try {
                await getUserById(data._id, dispatchUser);
            } catch (error) {
                console.log(error);
            }
        };

        getUser();

    }, [dispatchUser])

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">
                <img src={netflixLogo} alt="Netflix" />
                <Link to="/" className="link">
                <span>HomePage</span>
                </Link>
                <Link to="/series" className="link">
                <span>Series</span>
                </Link>
                <Link to="/movies" className="link">
                <span>Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <Search className="icon"/>
                <img src={user.profilePic} alt="Profile-Pic" className="profilePic" onClick={togglePopup}/>
                {isOpen && <Popup content={
                    <div className="userUpdate">
                    <span className="userUpdateTitle">User Profile</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <span className="profileShowTitle">Full Name :</span>
                                <span className="profileShow">{user.username}</span>
                            </div>
                            <div className="userUpdateItem">
                                <span className="profileShowTitle">Email-Id :</span>
                                <span className="profileShow">{user.email}</span>
                            </div>
                            <div className="userUpdateItem">
                                <span className="profileShowTitle">Is Admin ? :</span>
                                <span className="profileShow">{user.isAdmin ? "Yes" : "No"}</span>
                            </div>
                            <div className="userUpdateItem">
                                <span className="profileShowTitle">Created On :</span>
                                <span className="profileShow">{user.createdAt}</span>
                            </div>
                            <div className="userUpdateItem">
                                <span className="profileShowTitle">Updated On :</span>
                                <span className="profileShow">{user.updatedAt}</span>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src={user.profilePic} alt="Upload-Img" className="userUpdateImg"/>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
                } handleClose={togglePopup} />}
                <div className="profile">
                <ArrowDropDown className="icon"/>
                    <div className="options">
                        <span>Settings</span>
                        <span onClick={() => dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Navbar
