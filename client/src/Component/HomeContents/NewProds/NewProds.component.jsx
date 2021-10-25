import React from "react";
import { Container, Row } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { message, Carousel } from "antd";
import ProductInfo from "../../shop/ShopCatalog/ProductInfo/ProductInfo.component";

const PRODUCTS = gql`
  query {
    newArivals {
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

function NewProds() {
  const paginate = (array, page_size, page_number) => {
    if (array.length > 0) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    }
  };

  const { loading, error, data } = useQuery(PRODUCTS, {
    errorPolicy: "all",
  });

  if (loading) {
    return (
      <div className="collection-container">
        <Container>
          <Row>
            <div className="section-title">NEW COLLECTIONS</div>
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
            <div className="section-title">NEW COLLECTIONS</div>
          </Row>

          <Carousel autoplay dotPosition="right">
            {Array(Math.floor(data?.newArivals.length / 4))
              .fill(1)
              .map((el, i) => (
                <Row className="carousel-flex">
                  {paginate(data?.newArivals, 4, i + 1).map((product) => (
                    <ProductInfo product={product} />
                  ))}
                </Row>
              ))}
          </Carousel>
        </Container>
      </div>
    );
  }
}

export default NewProds;
