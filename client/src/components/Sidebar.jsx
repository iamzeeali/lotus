import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="text-white p-3 fw-bold text-center"> Lotus Wireless</h5>
      <a className="" href="#home">
        <i className="fa fa-tachometer"> </i> Cockpit
      </a>

      <div className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-bar-chart"> </i> Analytics
        </Link>
        <div className="dropdown-menu bg-dark">
          <Link className="dropdown-item" to="/report">
            Analytics
          </Link>
          <Link className="dropdown-item" to="/bar">
            Validation
          </Link>
        </div>
      </div>

      <Link to="#contact">
        <i className="fa fa-archive"> </i> Archive Data
      </Link>
      <a href="#about">
        {' '}
        <i className="fa fa-question-circle"> </i> Help
      </a>
    </div>
  );
};

export default Sidebar;
