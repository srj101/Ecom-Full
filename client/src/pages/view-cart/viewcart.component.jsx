import React from "react";
import { selectCartItems } from "../../redux/cart/cart.selector";
import "./viewcart.style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import SubTotal from "../../Component/SubTotal/subtotal.component";
import VeiwCartItem from "../../Component/View-Cart-Item/viewcartitem.component";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

const ViewCart = ({ cartItems }) => {
  const history = useHistory();
  if (cartItems.length === 0) {
    history.push("/shop");
  }
  return (
    <Container>
      <Row>
        <Col>
          <div className="view-cart">
            <div className="viewcart-header">
              <span> Product </span>
              <span> Price </span>
              <span> Quantity </span>
              <span> Total </span>
              <span> Remove </span>
            </div>
            {cartItems.map((cartItem) => (
              <VeiwCartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 8 }}>
          <SubTotal />
        </Col>
      </Row>
    </Container>
  );
};

const mapToStateProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapToStateProps)(ViewCart);
