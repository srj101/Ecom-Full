import React from "react";
import { Row, Col } from "react-bootstrap";

function ModalContent(props) {
  const { data } = props;
  console.log(data);
  return (
    <Row>
      <Col lg={6}>
        <div className="product-image-slider">
          <img src={data.image[0]} alt="" />
        </div>
      </Col>
      <Col lg={6}>
        <div className="product-details-b">{data.name}</div>
      </Col>
    </Row>
  );
}

export default ModalContent;
