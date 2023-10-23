import React from 'react'
import "./newMovie.css"
import storage from "../../firebase"
import {createMovie} from "../../context/movieContext/apiCalls"
import {MovieContext} from "../../context/movieContext/MovieContext"
import { useState, useContext } from 'react'
import {Snackbar,Alert, Stack} from "@mui/material"
import {useSnackbar} from "notistack"


function NewProduct() {

    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const {dispatch} = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({...movie, [e.target.name]: value});
    };

    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }

        setOpen(false);
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
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
                        setMovie((prev) => {
                            return {...prev, [item.label]: url};
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        try {
            if(movie.title === undefined || movie.title === ""){
                setOpen(true);
                setError("Movie Title is required!!!");
            }
            else if(movie.desc === undefined || movie.desc === ""){
                setOpen(true);
                setError("Movie Description is required!!!");
            }
            else if(movie.year === undefined || movie.year === ""){
                setOpen(true);
                setError("Movie's Releasing Year is required!!!");
            }
            else if(movie.categ === undefined || movie.categ === ""){
                setOpen(true);
                setError("Movie's Category Selection is required!!!");
            }
            else if(movie.duration === undefined || movie.duration === ""){
                setOpen(true);
                setError("Movie's Duration is required!!!");
            }
            else if(movie.limit === undefined || movie.limit === ""){
                setOpen(true);
                setError("Movie Streamer's Age Limit is required!!!");
            }
            else if(movie.isSeries === undefined || movie.isSeries === ""){
                setOpen(true);
                setError("Movie's Type Selection is required!!!");
            }
            else{
                upload([
                    {file: img, label: "img"},
                    {file: imgTitle, label: "imgTitle"},
                    {file: imgSm, label: "imgSm"},
                    {file: trailer, label: "trailer"},
                    {file: video, label: "video"},
                ]);
            }
        } catch (error) {
            setOpen(true);
            setError("You can't submit Empty Form!!");
        }
    };
    
    console.log(movie);

    const handleCreate = (e) => {
        e.preventDefault();
        console.log(movie);
        try {
            if(movie.img === undefined || movie.img === ""){
                setOpen(true);
                setError("Movie's Poster Image is required!!!")
            }
            else if(movie.imgTitle === undefined || movie.imgTitle === ""){
                setOpen(true);
                setError("Movie's Title Image is required!!!")
            }
            else if(movie.imgSm === undefined || movie.imgSm === ""){
                setOpen(true);
                setError("Movie's Thumbnail Image is required!!!");
            }
            else if(movie.title === undefined || movie.title === ""){
                setOpen(true);
                setError("Movie Title is required!!!");
            }
            else if(movie.desc === undefined || movie.desc === ""){
                setOpen(true);
                setError("Movie Description is required!!!");
            }
            else if(movie.year === undefined || movie.year === ""){
                setOpen(true);
                setError("Movie's Releasing Year is required!!!");
            }
            else if(movie.categ === undefined || movie.categ === ""){
                setOpen(true);
                setError("Movie's Category Selection is required!!!");
            }
            else if(movie.duration === undefined || movie.duration === ""){
                setOpen(true);
                setError("Movie's Duration is required!!!");
            }
            else if(movie.limit === undefined || movie.limit === ""){
                setOpen(true);
                setError("Movie Streamer's Age Limit is required!!!");
            }
            else if(movie.isSeries === undefined || movie.isSeries === ""){
                setOpen(true);
                setError("Movie's Type Selection is required!!!");
            }
            else if(movie.trailer === undefined || movie.trailer === ""){
                setOpen(true);
                setError("Movie Trailer is required!!!");
            }
            else if(movie.video === undefined || movie.video === ""){
                setOpen(true);
                setError("Movie File is required!!!");
            }
            else{
                setError("");
                createMovie(movie, dispatch);
                setOpen(true);
                setMessage("New Movie Is Created Successfully!!");
            }
        } catch (error) {
            setOpen(true);
            setError("You can't submit Empty Form!!");
        }
    };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0]) } required />
        </div>
        <div className="addProductItem">
            <label>Title Image</label>
            <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0]) } required />
        </div>
        <div className="addProductItem">
            <label>Thumbnail Image</label>
            <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])} required />
        </div>
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="Movie Title.." name="title" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
            <label>Description</label>
            <input type="text" placeholder="Description.." name="desc" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
            <label>Year</label>
            <input type="text" placeholder="Year.." name="year" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
            <label>Category</label>
            <select name="categ" id="categ" onChange={handleChange} required >
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
        </div>
        <div className="addProductItem">
            <label>Duration</label>
            <input type="text" placeholder="Ex : 1h 45m" name="duration" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
            <label>Age Limit</label>
            <input type="text" placeholder="Ex : 16+" name="limit" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange} required >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div className="addProductItem">
            <label>Trailer</label>
            <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} required />
        </div>
        <div className="addProductItem">
            <label>Video</label>
            <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} required />
        </div>
        {uploaded === 5 ? (
            <button className="addProductButton1" onClick={handleCreate}>Create</button>
        ) : (
            <button className="addProductButton1" onClick={handleUpload}>Upload</button>
        )}
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

export default NewProduct
