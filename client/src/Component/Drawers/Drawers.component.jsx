import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Drawer, Space } from "antd";
import CartWishDrawer from "../cart-Whish-Drawer/cart-wish-drawer.component";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
function Drawers(props) {
  const { title, data, icon, count, type } = props;

  let total = 0;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  data.products.map((item) => {
    total += item.price * item.quantity;
  });
  return (
    <div className="drawer-wrapper">
      {icon === "FavoriteBorderIcon" ? (
        <FavoriteBorderIcon onClick={showDrawer} />
      ) : (
        ""
      )}
      {icon === "ShoppingCartIcon" ? (
        <ShoppingCartIcon onClick={showDrawer} />
      ) : (
        ""
      )}
      <Drawer
        title={title}
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
        keyboard={true}
        extra={
          <Space>
            <Button type="primary">{count}</Button>
          </Space>
        }
      >
        <Table responsive hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              {type === "cart" ? <th>QTY</th> : ""}
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {data.products.map((item) => (
              <CartWishDrawer
                name={item.name}
                price={item.price.toFixed(2)}
                id={item.id}
                type={type}
                quantity={item.quantity}
              />
            ))}
          </tbody>
        </Table>

        {type === "cart" ? (
          <h4 className="total">
            Total:
            <CurrencyFormat
              value={total.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </h4>
        ) : (
          ""
        )}
        {type === "cart" ? (
          <div className="cart-btns">
            <Link to="/cart" className=" view-cart-btn">
              View Cart
            </Link>
            <Link to="/checkout" className=" buy-now">
              Buy Now
            </Link>
          </div>
        ) : (
          ""
        )}
      </Drawer>
    </div>
  );
}

export default Drawers;
