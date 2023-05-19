import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="text-white p-3 fw-bold text-center"> Lotus Wireless</h5>
      <a class="" href="#home">
        <i className="fa fa-tachometer"> </i> Cockpit
      </a>

      <a href="#news">
        <i className="fa fa-line-chart"> </i> Analytics
      </a>
      <a href="#contact">
        <i className="fa fa-archive"> </i> Archive Data
      </a>
      <a href="#about">
        {" "}
        <i className="fa fa-question-circle"> </i> Help
      </a>
      <Link to="/">
        {" "}
        <i className="fa fa-sign-out"> </i> Logout
      </Link>
    </div>
  );
};

export default Sidebar;
