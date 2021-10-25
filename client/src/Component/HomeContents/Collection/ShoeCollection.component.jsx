import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductInfo from "../../shop/ShopCatalog/ProductInfo/ProductInfo.component";
import { gql, useQuery } from "@apollo/client";
import "./shoeStyles.css";
import { message } from "antd";

const PRODUCTS = gql`
  query {
    products {
      id
      name
      image
      price
      SKU
      offerPrice
      name
      stock
      catName
      desc {
        text
      }
    }
  }
`;
function ShoeCollection() {
  const { loading, error, data } = useQuery(PRODUCTS);
  if (loading) {
    return (
      <div className="collection-container">
        <Container>
          <Row>
            <div className="section-title">SUMMER COLLECTIONS</div>
          </Row>
          <Row>
            <h2 className="text-center">Loading...</h2>
          </Row>
        </Container>
      </div>
    );
  }
  if (error) {
    return message.error(error.message);
  }
  if (data) {
    return (
      <div className="collection-container">
        <Container>
          <Row>
            <div className="section-title">SUMMER COLLECTIONS</div>
          </Row>
          <Row>
            {data.products
              .filter((product, idx) => idx < 8)
              .map((product) => (
                <ProductInfo product={product} />
              ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ShoeCollection;
