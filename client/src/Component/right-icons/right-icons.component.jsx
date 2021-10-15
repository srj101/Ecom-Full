import React, { useEffect, useRef, useState } from "react";
import "./right-icons.style.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Drawers from "../Drawers/Drawers.component";
import Search from "../SearchComponent/Search.component";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { Image } from "cloudinary-react";

const RightIcons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const term = useSelector(({ term }) => term.term);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishItems = useSelector((state) => state.wish.wishlist);
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
    products: wishItems,
  };

  const logginStatus = useSelector((state) => state.user.loggedinStatus);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cart = {
    products: cartItems,
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
            type="wishlist"
            title="Wishlist"
            count={wishlist.products.length}
          />
          <div className="count">{wishlist.products.length}</div>
        </div>

        <div className="right-icon">
          <Link to="/login">
            {logginStatus ? (
              userInfo && userInfo?.profilepic ? (
                <Avatar
                  src={
                    <Image
                      cloudName="dp5tpp02p"
                      publicId={userInfo && userInfo?.profilepic}
                      alt={userInfo && userInfo?.firstname}
                    />
                  }
                />
              ) : (
                <PersonIcon />
              )
            ) : (
              <PersonIcon />
            )}
          </Link>
        </div>

        <div className="right-icon">
          <Drawers
            icon="ShoppingCartIcon"
            data={cart}
            type="cart"
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
