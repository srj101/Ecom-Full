import React from "react";
import "./subtotal.style.css";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { createStructuredSelector } from "reselect";
import { selectCartItemTotal } from "../../redux/cart/cart.selector";
import { Link, useLocation } from "react-router-dom";

const SubTotal = ({ total }) => {
  const location = useLocation();

  return (
    <div className="subtotal">
      <h1> Cart Totals </h1>
      <div className="sub-total">
        <h1>SUBTOTAL</h1>
        <span>
          <CurrencyFormat
            value={total.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </span>
        <div
          className="other-costs"
          style={{ display: location.pathname === "/cart" ? "none" : "block" }}
        >
          <h1>SHIPPING FEE</h1>
          <span>
            <CurrencyFormat
              value={0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
          <h1>DISCOUNT</h1>
          <span>
            <CurrencyFormat
              value={0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
        </div>
      </div>
      <div className="total">
        <h1>GRAND TOTAL</h1>
        <span>
          <CurrencyFormat
            value={total.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </span>
      </div>
      <Link className="procced-checkout" to="/checkout">
        PROCEED TO CHECKOUT
      </Link>
    </div>
  );
};
export default connect(
  createStructuredSelector({
    total: selectCartItemTotal,
  })
)(SubTotal);
