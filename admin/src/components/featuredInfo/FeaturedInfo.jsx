import React from 'react'
import "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons"

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,415</span>
            <span className="featuredMoneyRate">-11.4 <ArrowDownward className="featuredIcon negative"/></span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,225</span>
            <span className="featuredMoneyRate">-9.4 <ArrowDownward className="featuredIcon negative"/></span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,155</span>
            <span className="featuredMoneyRate">+2.64 <ArrowUpward className="featuredIcon"/></span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo
