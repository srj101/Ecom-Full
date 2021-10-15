import React from "react";
import "./cartTotal.style.css";
import { connect, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { createStructuredSelector } from "reselect";
import { selectCartItemTotal } from "../../../../redux/cart/cart.selector";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

const CartTotal = ({ total }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="carTotal">
      <h1> Cart Totals </h1>
      <div className="cart-total">
        <h1>SUBTOTAL</h1>
        <span>
          <CurrencyFormat
            value={total.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </span>
        <div className="other-costs">
          <h5>Products</h5>
          {cartItems.map((item) => (
            <ul style={{ listStyle: "none" }}>
              <li icon={<CaretRightOutlined />}>
                {item.name} X {item.quantity}
              </li>
            </ul>
          ))}
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
      <Link className="buy-now" to="/payment-method">
        PROCEEED TO PAYMENT
      </Link>
    </div>
  );
};
export default connect(
  createStructuredSelector({
    total: selectCartItemTotal,
  })
)(CartTotal);
