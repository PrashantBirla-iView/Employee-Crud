import React from "react";
import image from "../Component/logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav px-5">
      <NavLink className="navbar-brand" to="/">
        <img src={image} alt="" className="image" />
      </NavLink>
    </div>
  );
}

export default Navbar;
