import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./category.styles.css";
function CategoriesShowcase() {
  return (
    <div className="category-show">
      <Container>
        <Row>
          <Col>
            <div className="category-ad item-one">
              <h5>SHOE COLLECTions</h5>
              <h2>
                shoe items <br /> upto 50%
              </h2>
              <Link to="/shop">SHOP NOW</Link>
            </div>
          </Col>
          <Col>
            <div className="category-ad item-two">
              <h5>sportwear COLLECTions</h5>
              <h2>sportwear essential items upto 70%</h2>
              <Link to="/shop">SHOP NOW</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CategoriesShowcase;
