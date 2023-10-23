import React from 'react'
import "./widgetLg.css"
import profile from "./images/profile.jpg"

function WidgetLg() {

  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transaction</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={profile} alt="Profile-pic" className="widgetLgImg"/>
            <span className="widgetLgName">Yash Ambaliya</span>
          </td>
          <td className="widgetLgDate">3 Jun 2022</td>
          <td className="widgetLgAmount">$256.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved"/> 
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={profile} alt="Profile-pic" className="widgetLgImg"/>
            <span className="widgetLgName">Yash Ambaliya</span>
          </td>
          <td className="widgetLgDate">3 Jun 2022</td>
          <td className="widgetLgAmount">$256.00</td>
          <td className="widgetLgStatus">
            <Button type="Declined"/> 
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={profile} alt="Profile-pic" className="widgetLgImg"/>
            <span className="widgetLgName">Yash Ambaliya</span>
          </td>
          <td className="widgetLgDate">3 Jun 2022</td>
          <td className="widgetLgAmount">$256.00</td>
          <td className="widgetLgStatus">
            <Button type="Pending"/> 
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={profile} alt="Profile-pic" className="widgetLgImg"/>
            <span className="widgetLgName">Yash Ambaliya</span>
          </td>
          <td className="widgetLgDate">3 Jun 2022</td>
          <td className="widgetLgAmount">$256.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved"/> 
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLg
