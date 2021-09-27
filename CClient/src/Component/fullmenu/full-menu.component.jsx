import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import "./full-menu.style.css";
import { Link } from "react-router-dom";

const FullMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const subofShop = document.querySelector(".sub_menu__item");

  const handleClick = (e) => {
    setIsMenuOpen(true);
  };

  const closemenu = (e) => {
    setIsMenuOpen(false);
  };

  const showSub = () => {
    subofShop.classList.toggle("show");
  };

  return (
    <div className="full-menu">
      <MenuIcon onClick={handleClick} />

      <div
        className={isMenuOpen ? `overlay__menu_showed` : `overlay__menu_hidden`}
      >
        <div className="menu-close" onClick={closemenu}>
          <span className="x">X</span>
        </div>
        <div className="menu__list">
          <div className="menu__item">
            <Link to="/">Home</Link>
          </div>
          <div className="menu__item">
            <Link to="/shop">Shop</Link>
          </div>
          <div className="menu__item" onClick={showSub}>
            <Link to="/">Pages</Link>
            <div className="sub_menu__item menu__item">
              <Link to="/about">About Us</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="menu__item">
            <Link to="/blog">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullMenu;
