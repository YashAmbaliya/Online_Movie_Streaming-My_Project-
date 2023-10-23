import React from 'react'
import "./newList.css"
import {getMovies} from "../../context/movieContext/apiCalls"
import {MovieContext} from "../../context/movieContext/MovieContext"
import {ListContext} from "../../context/listContext/ListContext"
import {createList} from "../../context/listContext/apiCalls"
import { useState, useContext, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {Snackbar,Alert, Stack} from "@mui/material"

function NewList() {
    const [list, setList] = useState(null);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {dispatch} = useContext(ListContext);
    const {movies, dispatch: dispatchMovie} = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({...list, [e.target.name]: value});
    };

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({...list, [e.target.name]: value});
    };

    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }

        setOpen(false);
    };
    
    console.log(list);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if(list.title === undefined || list.title === ""){
                setOpen(true);
                setError("List Title is required!!!")
            }
            else if(list.categ === undefined || list.categ === ""){
                setOpen(true);
                setError("List's Category Selection is required!!!")
            }
            else if(list.type === undefined || list.type === ""){
                setOpen(true);
                setError("List's Type Selection is required!!!");
            }
            else if(list.content === undefined || list.content === ""){
                setOpen(true);
                setError("List's Movie Content Selection is required!!!");
            }else{
                setError("");
                createList(list, dispatch);
                setOpen(true);
                setMessage("New List Is Created!!");
            }

        } catch (error) {
            setOpen(true);
            setError("You can't submit Empty Form!!");
        }
        // createList(list, dispatch);
        // navigate("/lists");
    };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
            <div className="addProductItem">
                <label>Title</label>
                <input type="text" placeholder="List name.." name="title" onChange= {handleChange} required />
            </div>
            <div className="addProductItem">
                <label>Category</label>
                <select name="categ" id="categ" onChange={handleChange} required >
                    <option>Category</option>
                    <option value="adventure">Adventure</option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                </select>
            </div>
            <div className="addProductItem">
                <label>Type</label>
                <select name="type" onChange={handleChange} required >
                    <option>Type</option>
                    <option value="movies">Movie</option>
                    <option value="series">Series</option>
                </select>
            </div>
        </div>
        <div className="formRight">
            <div className="addProductItem">
                <label>Content</label>
                <select name="content" onChange={handleSelect} style={{height: "280px"}} required multiple>
                    {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}>{movie.title}</option>
                    ))};
                </select>
            </div>
        </div>
            <button className="addProductButton1" onClick={handleSubmit}>Create</button>
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

export default NewList
