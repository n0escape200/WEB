import React from "react";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-xxl ">
      <div className="content-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">Home</li>
            <li className="nav-item">Home</li>
            <li className="nav-item">Home</li>
            <li className="nav-item">Home</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
