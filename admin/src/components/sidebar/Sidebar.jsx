import React, { } from 'react'
import "./sidebar.css"
import {LineStyle,
    PermIdentity,
    PlayCircleOutline,
    List,
    LibraryAdd,
    PlaylistAdd,
    PersonAddAlt,
    } from "@mui/icons-material"
import {Link} from "react-router-dom"

function Sidebar() {

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
                <Link to="/" className="link" >
                {/* <NavLink exact activeClassName="sidebarListItem active" className="sidebarListItem" to="/"> */}
                <li className="sidebarListItem">
                    <LineStyle className="sidebarIcon"/>
                    Home
                </li>
                {/* </NavLink> */}
                </Link>
                <Link to="/users" className="link" >
                <li className="sidebarListItem" >
                    <PermIdentity className="sidebarIcon"/>
                    User
                </li>
                </Link>
                <Link to="/newUser" className="link" >
                <li className="sidebarListItem" >
                    <PersonAddAlt className="sidebarIcon"/>
                    Create User
                </li>
                </Link>
                <Link to="/movies" className="link" >
                <li className="sidebarListItem" >
                    <PlayCircleOutline className="sidebarIcon"/>
                    Movies
                </li>
                </Link>
                <Link to="/newMovie" className="link" >
                <li className="sidebarListItem" >
                    <LibraryAdd className="sidebarIcon"/>
                    Add Movies
                </li>
                </Link>
                <Link to="/lists" className="link" >
                <li className="sidebarListItem" >
                    <List className="sidebarIcon"/>
                    Lists
                </li>
                </Link>
                <Link to="/newList" className="link" >
                <li className="sidebarListItem" >
                    <PlaylistAdd className="sidebarIcon"/>
                    Add Lists
                </li>
                </Link>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
