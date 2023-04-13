import React from "react";
import image from "../Component/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("email");
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    history("/");
  };

  return (
    <div className="container">
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src={image} alt="" className="image" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {isLoggedIn ? (
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <>
                  <NavLink className="nav-link" aria-current="page" to="/Login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/Signup">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
