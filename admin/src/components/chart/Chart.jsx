import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart({title, data, dataKey, grid}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
            {grid && <CartesianGrid stroke="#242323" strokeDasharray="5 5" />}
            <XAxis dataKey="name" stroke="#fb1111ec"/>
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#fb1111ec"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
