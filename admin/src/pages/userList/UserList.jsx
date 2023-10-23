import React from 'react'
import "./userList.css"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext/UserContext'
import { deleteUser, getUser } from '../../context/userContext/apiCalls'
import {Snackbar,Alert, Stack} from "@mui/material"

function UserList() {

  const {user, dispatch} = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }

    setOpen(false);
  };

  const handleDelete = (id, username) => {
    try {
        setError("");
        deleteUser(id, dispatch);
        setOpen(true);
        setMessage(username + " named user has Deleted!!");
    } catch (error) {
        setOpen(true);
        setError("User has Not Deleted!!");
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'user', headerName: 'User', width: 180, renderCell: (params) => {
      return(
        <div className="userListUser">
          <img className="userListImg" src={params.row.profilePic || defaultAvatar} alt="avatar" />
          {params.row.username}
        </div>
      );
    } },
    { field: 'email', headerName: 'Email-Id', width: 180 },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      width: 120,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={params.row}>
            <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id, params.row.username)}/>
          </>
        );
      },
    },
  ];
  
  return (
    <div className="userList">
      <DataGrid
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
        sx={{color: 'white' }}
      />
      <Stack sx={{width: "100%"}} spacing={2}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
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

export default UserList
