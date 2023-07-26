import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/line">
            <img
              src="lotus.png"
              alt=""
              style={{ width: '50px' }}
              className="mx-5"
            />{' '}
            <br />
            <img src="logo.png" alt="" width={120} className="mx-2" />{' '}
          </Link>

          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-5" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <h1 className="   fw-bold">SilCal</h1>
              <li className="nav-item">
                <Link className="nav-link active" to="/report">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sync
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pause
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Update
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-secondary " type="submit">
                Search
              </button>
            </form>
            &nbsp; &nbsp; <i className="fa fa-bell fa-2x"> </i>
            &nbsp; &nbsp; <i className="fa fa-question fa-2x"> </i>
            &nbsp; &nbsp;{' '}
            <Link to="/">
              {' '}
              <i className="fa fa-sign-out fa-2x"> </i>
            </Link>
            &nbsp; &nbsp;{' '}
            <img
              src="sail.png"
              alt=""
              width={30}
              style={{ backgroundColor: '#fff' }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
