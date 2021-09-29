import React, { useEffect, useState } from "react";
import "./shopCatalog.style.css";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { gql, useQuery } from "@apollo/client";
import ProductInfo from "./ProductInfo/ProductInfo.component";
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
  const dispatch = useDispatch();
  const term = useSelector(({ term }) => term.term);
  const catt = useSelector(({ term }) => term.cat);
  const colorr = useSelector(({ term }) => term.color);
  const [Tag, setTag] = useState("");
  const [Color, setColor] = useState("");
  const [Cat, setCat] = useState("");
  const location = useLocation();

  const { loading, error, data } = useQuery(SHOP_PRODUCTS, {
    variables: {
      searchProductsInput: { tag: Tag, colorName: Color, catName: Cat },
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (location.pathname === "/shop") {
      console.log(true);
      dispatch({ type: "CAT_TRIGGER", payload: "" });
      dispatch({ type: "COLOR_TRIGGER", payload: "" });
    }
    setColor(colorr);
    setTag(term);
    setCat(catt);

    setProducts(data?.SearchProducts);
  }, [data, term, catt, colorr, location]);

  if (error) {
    return error.message;
  }

  return (
    <div className="shop-catelog">
      {loading ? (
        <Row>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((item) => (
            <Col key={item} lg={4}>
              <Skeleton />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {products && products.length === 0 ? (
            <div className="danger">No result Found</div>
          ) : (
            <Row>
              <p className="item-count">
                {products && `${products.length} items found`}
              </p>
              {products &&
                products.map(({ image, name, id, desc }) => {
                  return (
                    <Col key={id} lg={4}>
                      <ProductInfo info={{ image, id, name, desc }} />
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
