import React, { useEffect, useState } from "react";
import "./shopCatalog.style.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { gql, useQuery } from "@apollo/client";
const SHOP_PRODUCTS = gql`
  query products($searchProductsInput: SearchInput!) {
    SearchProducts(input: $searchProductsInput) {
      id
      name
      image
      desc {
        text
      }
    }
  }
`;
function ShopCatelog() {
  const term = useSelector((state) => state.term);
  const [Tag, setTag] = useState("");
  const [Color, setColor] = useState("");
  const [Cat, setCat] = useState("");

  const { loading, error, data } = useQuery(SHOP_PRODUCTS, {
    variables: {
      searchProductsInput: { tag: Tag, colorName: Color, catName: Cat },
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTag(term.state);
    console.log(term);

    setProducts(data?.SearchProducts);
  }, [data]);

  if (error) {
    return error.message;
  }

  return (
    <div className="shop-catelog">
      <input
        type="text"
        placeholder="Colors"
        onChange={(e) => setColor(e.target.value)}
        value={Color}
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCat(e.target.value)}
        value={Cat}
      />
      <input
        type="text"
        placeholder="tag"
        onChange={(e) => setTag(e.target.value)}
        value={Tag}
      />
      {loading ? (
        "loading...."
      ) : (
        <Row>
          {products && products.length === 0 ? (
            <div className="danger">No result Found</div>
          ) : (
            <Row>
              <p>{products && `${products.length} items found`}</p>
              {products &&
                products.map(({ image, name, id, desc }) => {
                  return (
                    <Col key={id} lg={4}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={image[0]} alt={name} />
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>
                            {desc[0].text.substring(0, 45)}...
                          </Card.Text>
                          <Link to={`/product/${id}`}>ADD TO CART</Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          )}
        </Row>
      )}
    </div>
  );
}

export default ShopCatelog;
