import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./loginregister.styles.css";

import CartTotal from "../../Component/shop/ShopCatalog/CartTotal/CartTotal.component";
import CheckoutForm from "./CheckoutForm.component";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

function RegisterLogin() {
  const logginStatus = useSelector((state) => state.user.loggedinStatus);
  const history = useHistory();
  if (logginStatus) {
    history.push("/payment-method");
  }
  return (
    <div className="registration-form">
      <Container>
        <Row>
          <Col lg={7}>
            <CheckoutForm />
          </Col>
          <Col lg={5}>
            <CartTotal />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterLogin;
