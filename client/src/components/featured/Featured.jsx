import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import React from 'react';
import "./featured.css";
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

function Featured({type, setCateg}) {
  const [content, setContent] = useState({});

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/watch", {state: content});
  };

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        console.log(res.data);
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
        {type && (
            <div className="category">
                <span>{type === "movies" ? "Movies" : "Series"}</span>
                <select name="categ" id="categ" onChange={(e)=>setCateg(e.target.value)}>
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
        )}
      <img src={content.img} alt="Post" />
      <div className="info">
        <img src={content.imgTitle} alt="Movie-1" />
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
            <button className="play" onClick={handleClick}>
                <PlayArrow />
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlined />
                <span>Info</span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Featured
