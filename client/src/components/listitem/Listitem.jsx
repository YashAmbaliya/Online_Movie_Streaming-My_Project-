import React from 'react';
import "./listitem.css";
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Listitem({index, item}) {
  
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch" state={movie}>
    <div className="listItem" style={{left: isHovered && index * 225 - 50 + index * 2.5}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={movie.imgSm} alt="Movie-2" />
      {isHovered && (
        <>
      <video src={movie.trailer} autoPlay={true} loop />
      <div className="itemInfo">
        <div className="icons">
          <PlayArrow className="icon"/>
          <Add className="icon"/>
          <ThumbUpAltOutlined className="icon"/>
          <ThumbDownAltOutlined className="icon"/>
        </div>
        <div className="itemInfoTop">
          <span>{movie.duration}</span>
          <span className="limit">+{movie.limit}</span>
          <span>{movie.year}</span>
        </div>
        <div className="desc">
          {movie.desc}
        </div>
        <div className="categ">{movie.categ}</div>
      </div>
      </>
      )}
    </div>
    </Link>
  )
}

export default Listitem
