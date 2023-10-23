import React, { useContext, useState } from 'react'
import "./movie.css"
import { useLocation } from "react-router-dom"
import {Publish} from "@material-ui/icons"
import { MovieContext } from '../../context/movieContext/MovieContext';
import storage from '../../firebase';
import { updateMovie } from '../../context/movieContext/apiCalls';
import {Snackbar,Alert, Stack} from "@mui/material"
import {useSnackbar} from "notistack"

function Product() {

  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [updatedImg, setUpdatedImg] = useState(null);
  const [updatedImgTitle, setUpdatedImgTitle] = useState(null);
  const [updatedImgSm, setUpdatedImgSm] = useState(null);
  const [updatedTrailer, setUpdatedTrailer] = useState(null);
  const [updatedVideo, setUpdatedVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {enqueueSnackbar} = useSnackbar();

  const {dispatch} = useContext(MovieContext);

  const location = useLocation();
  const movie = location.state;

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({...updatedMovie, [e.target.name]: value});
  };

  const upload = (items) => {
    items.forEach((item) => {
      const filename = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/replacedItems${filename}`).put(item.file);
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
            setUpdatedMovie((prev) => {
              return {...prev, [item.label]: url};
            });
            setUploaded((prev) => prev + 1);
          });
        },
      );
    });
    setError("");
    setOpen(true);
    setMessage("Media File Updated!!");
  };

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }

    setOpen(false);
};

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {file: updatedImg, label: "img"},
      {file: updatedImgTitle, label: "imgTitle"},
      {file: updatedImgSm, label: "imgSm"},
      {file: updatedTrailer, label: "trailer"},
      {file: updatedVideo, label: "video"},
    ]);
  };

  console.log(updatedMovie);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    updateMovie(movie._id, updatedMovie, dispatch);
    setOpen(true);
    setMessage(movie.title + " named Movie Is Updated Successfully!!");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update Movie</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} onChange={handleChange}/>
            <label>Description</label>
            <textarea type="text" placeholder={movie.desc} rows="4" onChange={handleChange} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} onChange={handleChange}/>
            <label>Category</label>
            <select name="categ" id="categ" value={movie.categ} onChange={handleChange}>
                    <option value="">Category</option>
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
            <label>Duration</label>
            <input type="text" placeholder={movie.duration} onChange={handleChange}/>
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} onChange={handleChange}/>
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" value={movie.isSeries} onChange={handleChange}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <label>Trailer</label>
            <input type="file" name="trailer" onChange={(e) => setUpdatedTrailer(e.target.files[0])}/>
            <label>Video</label>
            <input type="file" name="video" onChange={(e) => setUpdatedVideo(e.target.files[0])}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <label className="imgTitle">Title Image :</label>
              <img src={movie.imgTitle} alt="Product-img" className="productUploadImg1" />
              <label for="imgTitle">
                <Publish className="uploadIcon"/>
              </label>
              <input type="file" id="imgTitle" name="imgTitle" style={{display: "none"}} onChange={(e) => setUpdatedImgTitle(e.target.files[0])}/>
            </div>
            <div className="productUpload">
              <label className="imgTitle">Thumnail Image :</label>
              <img src={movie.imgSm} alt="Product-img" className="productUploadImg2" />
              <label for="imgSm">
                <Publish className="uploadIcon"/>
              </label>
              <input type="file" id="imgSm" name="imgSm" style={{display: "none"}} onChange={(e) => setUpdatedImgSm(e.target.files[0])}/>
            </div>
            <div className="productUpload">
              <label className="imgTitle">Poster Image :</label>
              <img src={movie.img} alt="Product-img" className="productUploadImg3" />
              <label for="img">
                <Publish className="uploadIcon"/>
              </label>
              <input type="file" id="img" name="img" style={{display: "none"}} onChange={(e) => setUpdatedImg(e.target.files[0])}/>
            </div>
            {uploaded === 5 ? (
              <button className="productButton" onClick={handleUpdate}>Update</button>
            ) : (
              <button className="productButton" onClick={handleUpload}>Update Media</button>
            )}  
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

export default Product
