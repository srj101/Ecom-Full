import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productInfo.styles.css";
import { AddItem } from "../../../../redux/cart/cart.action";
import { AddItemToWishList } from "../../../../redux/wishList/wish.action";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { Modal } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ModalContent from "./ModalContent.component";

function ProductInfo(state) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();

  const handleAddtoCart = (e) => {
    e.preventDefault();
    dispatch(AddItem(state.product));
  };

  const handleAddtoWishList = (e) => {
    e.preventDefault();
    dispatch(AddItemToWishList(state.product));
  };

  const { name, id, image, price } = state.product;

  return (
    <Col lg={3}>
      <Link className="product-info" to={`/product/${id}`}>
        <div className="product-image">
          <img src={image[0]} alt={name} />
          <div className="product-navs">
            <Link id={id} onClick={handleAddtoCart}>
              <ShoppingCartOutlined /> ADD TO CART
            </Link>
            <div className="product-nav-icons">
              <Link onClick={showModal}>
                <EyeOutlined />
              </Link>

              <Link id={id} onClick={handleAddtoWishList}>
                <span>
                  <HeartOutlined />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="product-detail">
          <h4>{name}</h4>
          <p>
            <CurrencyFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </p>
        </div>
      </Link>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <ModalContent data={state.product} />
      </Modal>
    </Col>
  );
}

export default ProductInfo;

// practice problem 31
// P1-1A
// P1-2A
// P1-4A
