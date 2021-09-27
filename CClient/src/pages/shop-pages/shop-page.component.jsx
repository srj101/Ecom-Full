import React from "react";
import "./shop-page.style.css";
import ShopHeader from "../../Component/shop/shopHeader/shopHeader.component";
import ShopNav from "../../Component/shop/shopNav/shopNav.component";
import ShopLeftNav from "../../Component/shop/shopLeftNev/shopLeftNav.component";
import ShopCatelog from "../../Component/shop/ShopCatalog/shopCatalog.component";
import { Col, Container, Row } from "react-bootstrap";

const ShopPage = () => (
  <div className="shop-page">
    <ShopHeader />

    <Container>
      <Row>
        <ShopNav />
      </Row>
      <Row>
        <div className="shop-body">
          <Row>
            <Col lg={3}>
              <ShopLeftNav />
            </Col>
            <Col lg={9}>
              <ShopCatelog />
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  </div>
);
export default ShopPage;
