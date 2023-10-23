import React from 'react'
import "./widgetSm.css"
// import profile from "./images/profile.jpg"
import {Visibility} from "@material-ui/icons"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'

function WidgetSm() {

  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
        <li className="widgetSmListItem">
          <img src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="Profile-pic" className="widgetSmImg"/>
          <div className="widgetSmUser">
            <span className="widgetSmUserName">{user.username}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUserName">{user.email}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUserName">{user.createdAt}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUserName">{user.updatedAt}</span>
          </div>
          <Link to={"/user/" + user._id} state={user} className="widgetSmLink">
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon"/>
            Show
          </button>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetSm
