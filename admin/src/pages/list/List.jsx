import React, { useContext, useEffect, useState } from 'react'
import "./list.css"
import { useLocation } from "react-router-dom"
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getMovies } from '../../context/movieContext/apiCalls';
import {ListContext} from "../../context/listContext/ListContext"
import { updateList } from '../../context/listContext/apiCalls';
import {Snackbar,Alert, Stack} from "@mui/material"

function List() {

  const [updatedList, setUpdatedList] = useState(null);

  const {dispatch} = useContext(ListContext);

  const location = useLocation();
  const list = location.state;

  const {movies, dispatch: dispatchMovie} = useContext(MovieContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedList({...updatedList, [e.target.name]: value});
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedList({...updatedList, [e.target.name]: value});
  };

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }

    setOpen(false);
};

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    updateList(list._id, updatedList, dispatch);
    setOpen(true);
    setMessage(list.title + " named List Is Updated!!");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update List</h1>
        {/* <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link> */}
      </div>
      {/* <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Category:</span>
              <span className="productInfoValue">{list.categ}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" placeholder={list.title} onChange={handleChange}/>
            <label>Type</label>
            <select name="type" value={list.type} onChange={handleChange}>
              <option>Types</option>
              <option value="movies">Movie</option>
              <option value="series">Series</option>
            </select>
            <label>Category</label>
            <select name="categ" id="categ" value={list.categ} onChange={handleChange}>
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
            <label>Content</label>
            <select name="content" onChange={handleSelect} style={{height: "160px"}} multiple>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))};
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>Update</button>
          </div>
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
    </div>
  )
}

export default List
