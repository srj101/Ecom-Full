import React from "react";
import "./cart-wish-drawer.style.css";
import { DeleteOutlined } from "@ant-design/icons";
function CartWishDrawer({ name, price }) {
  return (
    <div className="cart-wish-drawer">
      <h1 class="productname">{name}</h1>
      <div class="price-cross">
        <h1 className="productprice">{price}</h1>
        <div className="button">
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
}

export default CartWishDrawer;
