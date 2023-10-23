import React from 'react'
import "./listList.css"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import {ListContext} from "../../context/listContext/ListContext"
import {getLists, deleteList} from "../../context/listContext/apiCalls"
import {Snackbar,Alert, Stack} from "@mui/material"
 
function ListList() {
    const {lists, dispatch} = useContext(ListContext);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
      getLists(dispatch);
    }, [dispatch]);

    const handleClose = (event, reason) => {
      if(reason === "clickaway"){
          return;
      }
  
      setOpen(false);
    };
    
    const handleDelete = (id, listName) => {
      try {
        setError("");
        deleteList(id, dispatch);
        setOpen(true);
        setMessage(listName + " named list has Deleted!!");
    } catch (error) {
        setOpen(true);
        setError("List has Not Deleted!!");
    }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'categ', headerName: 'Category', width: 200 },
        { field: 'type', headerName: 'Type', width: 200 },
        {
          field: 'action',
          headerName: 'Action',
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/list/" + params.row._id} state={params.row}>
                <button className="productListEdit1">Edit</button>
                </Link>
                <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id, params.row.title)}/>
              </>
            );
          },
        },
      ];

  return (
    <div className="productList">
        <DataGrid
            rows={lists}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
            sx={{color: 'white'}}
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

export default ListList
