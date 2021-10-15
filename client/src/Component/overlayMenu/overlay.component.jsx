import React from "react";
import { Link } from "react-router-dom";

import "./overlay.style.css";

const OverlayMenu = () => (
  <div className="overlay__menu">
    <div className="menu__listy">
      <div className="menu__item">
        <Link to="/">Home</Link>
      </div>
      <div className="menu__item">
        <Link to="/">Shop</Link>
      </div>
      <div className="menu__item">
        <Link to="/">Pages</Link>
      </div>
      <div className="menu__item">
        <Link to="/">Blog</Link>
      </div>
    </div>
  </div>
);
export default OverlayMenu;
