import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer';
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./home.css";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

function Home({type}) {
  const [lists, setLists] = useState([]);
  const [categ, setCateg] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${categ ? "&categ=" + categ : ""}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        console.log(res);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomList();
  },[type, categ]);

  return (
    <div className="home"> 
      <Navbar />
      <Featured type={type} setCateg={setCateg}/>
      {lists.map((list) => (
        <List list={list} key={list._id}/>
      ))}
      <Footer />
    </div>
  )
}

export default Home
