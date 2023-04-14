import React from "react";
import "../Footer/Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12 footer-main">
              <div className="col-md-3">
                <ul>
                  <li>
                    <NavLink className="navlink">Contact US</NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">Shipping</NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">
                      Return & Refund Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">Fees & Payment</NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul>
                  <li>
                    <NavLink className="navlink">Terms of service</NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">Privacy policy</NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">Customer Care</NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink">Track Your Order</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
