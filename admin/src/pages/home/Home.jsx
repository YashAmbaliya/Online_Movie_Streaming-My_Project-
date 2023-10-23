import React, { useMemo } from 'react'
import { useState } from 'react'
import Chart from '../../components/chart/Chart'
// import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
// import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import "./home.css"
import axios from "axios"
import { useEffect } from 'react'

function Home() {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const statsList = res.data.sort(function(a, b) {
          return a._id - b._id;
        });
        statsList.map((item) => setUserStats((prev) => [...prev, {name: MONTHS[item._id - 1], "New User": item.total},]));

      } catch (error) {
        console.log(error);
      }
    };
    
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userStats} title="Users Analytics" dataKey="New User" grid/>
      <div className="homeWidgets">
        <WidgetSm />
        {/* <WidgetLg /> */}
      </div>
    </div>
  )
}
export default Home
