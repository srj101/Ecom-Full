import React, { useEffect, useRef, useState } from "react";
import "./right-icons.style.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Drawers from "../Drawers/Drawers.component";
import Search from "../SearchComponent/Search.component";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RightIcons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const term = useSelector(({ term }) => term.term);

  const handleClick = (e) => {
    setIsMenuOpen(true);
  };

  const closemenu = (e) => {
    setIsMenuOpen(false);
  };
  let { pathname } = useLocation();
  const closeButton = useRef(null);
  useEffect(() => {
    closeButton.current.click();
  }, [pathname, term]);

  const wishlist = {
    products: [
      {
        name: "product #1",
        price: "$50",
      },
      {
        name: "product #2",
        price: "$150",
      },
    ],
  };

  const cart = {
    products: [
      {
        name: "product #5",
        price: "$500",
      },
      {
        name: "product #8",
        price: "$1500",
      },
      {
        name: "product #8",
        price: "$1500",
      },
    ],
  };

  return (
    <>
      <div className="right-icons" id="ok">
        <div className="right-icon">
          <SearchIcon onClick={handleClick} />
        </div>
        <div className="right-icon">
          <Drawers
            icon="FavoriteBorderIcon"
            data={wishlist}
            title="Wishlist"
            count={wishlist.products.length}
          />
          <div className="count">{wishlist.products.length}</div>
        </div>

        <div className="right-icon">
          <Link to="/login">
            <PersonIcon />
          </Link>
        </div>

        <div className="right-icon">
          <Drawers
            icon="ShoppingCartIcon"
            data={cart}
            title="Cart"
            count={cart.products.length}
          />
          <div className="count">{cart.products.length}</div>
        </div>

        <div
          className={
            isMenuOpen ? `overlay__menu_showed` : `overlay__menu_hidden`
          }
        >
          <Search />
          <div className="menu-close" onClick={closemenu} ref={closeButton}>
            <span>X</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default RightIcons;
