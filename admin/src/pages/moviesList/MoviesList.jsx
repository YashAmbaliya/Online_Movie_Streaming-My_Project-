import React from 'react'
import "./moviesList.css"
import {DataGrid} from "@mui/x-data-grid"
import {DeleteOutline} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import {MovieContext} from "../../context/movieContext/MovieContext"
import {deleteMovie, getMovies} from "../../context/movieContext/apiCalls"
import {Snackbar,Alert, Stack} from "@mui/material"
 
function MoviesList() {
    const {movies, dispatch} = useContext(MovieContext);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
      getMovies(dispatch);
    }, [dispatch]);

    const handleClose = (event, reason) => {
      if(reason === "clickaway"){
          return;
      }
  
      setOpen(false);
    };
    
    const handleDelete = (id, movieName) => {
      try {
          setError("");
          deleteMovie(id, dispatch);
          setOpen(true);
          setMessage(movieName + " named movie has Deleted!!");
      } catch (error) {
          setOpen(true);
          setError("Movie has not Deleted!!");
      }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'movie', headerName: 'Movie', width: 220, renderCell: (params) => {
          return(
            <div className="productListProduct">
              <img className="productListImg" src={params.row.imgSm} alt="avatar" />
              {params.row.title}
            </div>
          );
        } },
        { field: 'categ', headerName: 'Category', width: 150 },
        { field: 'year', headerName: 'Year', width: 150 },
        { field: 'limit', headerName: 'Limit', width: 150 },
        { field: 'isSeries', headerName: 'Is Series', width: 150 },
        {
          field: 'action',
          headerName: 'Action',
          width: 100,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/movie/" + params.row._id} state={params.row}>
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
            rows={movies}
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

export default MoviesList;
