import React from "react";

import "./viewcartitem.style.css";

import { connect } from "react-redux";
import {
  AddItem,
  ClearItemFormCart,
  removeItem,
} from "../../redux/cart/cart.action";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";

const VeiwCartItem = ({ cartItem, clearItem, AddItem, removeItem }) => {
  const { image, name, quantity, price } = cartItem;
  return (
    <div className="viewcartitem">
      <div className="image-container">
        <img src={image && image[0]} alt="item" />
        <span className="name">{name}</span>
      </div>
      <span className="price">
        {" "}
        <CurrencyFormat
          value={price.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </span>
      <span className="quantity">
        <div className="arrow1" onClick={() => removeItem(cartItem)}>
          <MinusCircleOutlined />
        </div>

        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => AddItem(cartItem)}>
          <PlusCircleOutlined />
        </div>
      </span>

      <span className="price">
        <CurrencyFormat
          value={(price * quantity).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </span>
      <span className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};

const mapToDispatchProps = (dispatch) => ({
  clearItem: (item) => dispatch(ClearItemFormCart(item)),
  AddItem: (item) => dispatch(AddItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapToDispatchProps)(VeiwCartItem);
