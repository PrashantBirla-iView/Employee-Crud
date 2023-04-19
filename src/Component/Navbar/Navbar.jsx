import React from "react";
import image from "../Navbar/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { toast } from "react-toastify";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("email");
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    history("/");
    toast.success("Logout Successfully", {
      style: { fontSize: "14px" },
    });
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
                <>
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/Product"
                  >
                    Product
                  </NavLink>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-user icon"></i>
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          class="drop-text dropdown-item nav-link "
                          aria-current="page"
                          to="/Orders"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="drop-text dropdown-item nav-link "
                          aria-current="page"
                          to="/Address"
                        >
                          Shipping Address
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="drop-text dropdown-item nav-link "
                          aria-current="page"
                          to="/ChangePassword"
                        >
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="drop-text dropdown-item nav-link "
                          aria-current="page"
                          to="/"
                          onClick={handleLogout}
                        >
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
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
