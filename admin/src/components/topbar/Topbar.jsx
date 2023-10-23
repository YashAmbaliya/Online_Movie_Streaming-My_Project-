import React, {useEffect, useState} from 'react'
import "./topbar.css"
import {ExitToApp} from '@material-ui/icons';
import { logout } from '../../context/authContext/AuthAction';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import {UserContext} from "../../context/userContext/UserContext"
import { getUserById } from '../../context/userContext/apiCalls';
import Popup from "../popup/Popup"
import {Link} from 'react-router-dom';
import localstorage from './localstorage';

function Topbar() {

  const {dispatch} = useContext(AuthContext);
  const {user, dispatch: dispatchUser} = useContext(UserContext);


  const [isOpen, setIsOpen] = useState(false);

  const data = localstorage();

  useEffect(() => {
    const getUser = async () => {
      try {
        await getUserById(data._id,dispatchUser);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();

  }, [dispatchUser]);

  console.log(user);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
            <span className="logo">  Admin</span>
        </div>
        <div className="topRight">
            {/* <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Language />
            </div> */}
            <img src={user.profilePic} alt="Profile-pic" className="topAvator" onClick={togglePopup}/>
            {isOpen && <Popup content={
              <div className="profile">
                <h1 className="profileTitle">Admin Profile</h1>
                <div className="profileInfo">
                  <img src={user.profilePic} alt="Profile-pic" className="profilePicture"/>
                </div>
                <div className="profileInfo">
                  <span className="profileShowTitle">Full Name :</span>
                  <span className="profileShow">{user.username}</span>
                </div>
                <div className="profileInfo">
                  <span className="profileShowTitle">Email-Id :</span>
                  <span className="profileShow">{user.email}</span>
                </div>
                <div className="profileInfo">
                  <span className="profileShowTitle">Is Admin ? :</span>
                  <span className="profileShow">{user.isAdmin ? "Yes" : "No"}</span>
                </div>
                <div className="profileInfo">
                  <span className="profileShowTitle">Created On :</span>
                  <span className="profileShow">{user.createdAt}</span>
                </div>
                <div className="profileInfo">
                  <span className="profileShowTitle">Updated On :</span>
                  <span className="profileShow">{user.updatedAt}</span>
                </div>
                <div className="profileInfo">
                  <Link to={"/user/" + user._id} state={user} >
                    <button className="profileUpdateBtn" onClick={togglePopup}>Update Data</button>
                  </Link>
                </div>
              </div>
            } handleClose={togglePopup} />}
            <div className="topbarIconContainer">
                <ExitToApp onClick={() => dispatch(logout())}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
