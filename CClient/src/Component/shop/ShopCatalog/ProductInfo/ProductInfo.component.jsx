import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productInfo.styles.css";

function ProductInfo({ info }) {
  const { name, id, image, desc } = info;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image[0]} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{desc[0].text.substring(0, 45)}...</Card.Text>
        <div className="product-navs">
          <Link to={`/product/${id}`}>View Product</Link>
          <Link to="/shop">Add to Cart</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;
