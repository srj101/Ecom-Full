import React from "react";
import { Link } from "react-router-dom";
import "./fourofour.css";
function FourOFour() {
  return (
    <div className="four-o-four">
      <div className="fouro-top">
        <div className="fouro-top-bg">
          <img
            src="http://lezada.reactdemo.hasthemes.com/assets/images/backgrounds/404-bg.jpg"
            alt=""
          />
        </div>
        <div className="fouro-content">
          <h1>
            Oops! <br />
            Page not found! PLEASE GO BACK TO <Link to="/">HOMEPAGE</Link>
          </h1>
        </div>
      </div>
      <div className="fouro-bottom"></div>
    </div>
  );
}

export default FourOFour;
