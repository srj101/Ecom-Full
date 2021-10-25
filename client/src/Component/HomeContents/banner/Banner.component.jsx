import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="ad-banner-wrapper">
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <h5>Shopping Korbo</h5>
              <h2>Shop Collection &amp; Sportwear Essential Packages</h2>
              <span></span>
              <p>Learn more about ShoppingKorbo and Discount packages</p>
              <Link to="/shop">LEARN MORE</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;
