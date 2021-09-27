import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Drawer, Space } from "antd";
import CartWishDrawer from "../cart-Whish-Drawer/cart-wish-drawer.component";

function Drawers({ title, data, icon, count }) {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
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
        width={350}
        onClose={onClose}
        visible={visible}
        keyboard={true}
        extra={
          <Space>
            <Button type="primary">{count}</Button>
          </Space>
        }
      >
        {data.products.map((item) => (
          <CartWishDrawer name={item.name} price={item.price} />
        ))}
      </Drawer>
    </div>
  );
}

export default Drawers;
