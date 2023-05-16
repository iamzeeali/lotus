import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto"></ul>
            <div class="input-group nav-search d-flex">
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                aria-describedby="button-addon2"
              />
              <button class="btn btn-light" type="button" id="button-addon2">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <i className="fa fa-bell text-danger px-2"></i>
            <i className="fa fa-question px-2"></i>
            <div
              className="rounded-circle border d-flex justify-content-center align-items-center px-2"
              style={{ width: "40px", height: "40px" }}
              alt="Avatar"
            >
              <img
                src="john.jpg"
                alt=""
                width={40}
                className="rounded-circle"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
