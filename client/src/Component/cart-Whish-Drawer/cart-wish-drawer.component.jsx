import React from "react";
import "./cart-wish-drawer.style.css";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { ClearItemFormCart } from "../../redux/cart/cart.action";
import CurrencyFormat from "react-currency-format";
import { removeItemFromWishList } from "../../redux/wishList/wish.action";
function CartWishDrawer(props) {
  const dispatch = useDispatch();
  const { name, price, quantity, type } = props;
  return (
    <tr>
      <td>{name}</td>
      {type === "cart" ? <td>{quantity}</td> : ""}
      <td>
        {type === "cart" ? (
          <CurrencyFormat
            value={(price * quantity).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        ) : (
          <CurrencyFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        )}
      </td>

      <td>
        {type === "cart" ? (
          <div
            className="button"
            onClick={() => dispatch(ClearItemFormCart(props))}
          >
            X
          </div>
        ) : (
          <div
            className="button"
            onClick={() => dispatch(removeItemFromWishList(props))}
          >
            X
          </div>
        )}
      </td>
    </tr>
  );
}

export default CartWishDrawer;
