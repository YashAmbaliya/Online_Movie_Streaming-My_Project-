import { ArrowBackOutlined } from '@material-ui/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./watch.css";

function Watch() {
  const location = useLocation();
  console.log(location);
  const movie = location.state;
  console.log(movie);
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        <span>Home</span>
      </div>
      </Link>
      <video className="video" src={movie.video} autoPlay progress controls />
    </div>
  )
}

export default Watch
