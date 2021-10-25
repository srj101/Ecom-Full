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
      price
      stock
      offerPrice
      image
      desc {
        text
        weight
        Dimensions
        otherInfo
      }
    }
  }
`;
function ShopCatelog() {
  const allprods = useSelector((state) => state.term.products);
  const dispatch = useDispatch();
  const term = useSelector(({ term }) => term.term);
  const catt = useSelector(({ term }) => term.cat);
  const colorr = useSelector(({ term }) => term.color);
  const lowToHigh = useSelector(({ term }) => term.lth);

  const [Tag, setTag] = useState("");
  const [Color, setColor] = useState("");
  const [Cat, setCat] = useState("");
  const location = useLocation();

  const { loading, error, data } = useQuery(SHOP_PRODUCTS, {
    variables: {
      searchProductsInput: {
        tag: Tag,
        colorName: Color,
        catName: Cat,
        lth: lowToHigh,
      },
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setColor(colorr);
    setTag(term);
    setCat(catt);

    setProducts(data?.SearchProducts);
  }, [data, term, catt, colorr, location, lowToHigh]);

  useEffect(() => {
    if (products) {
      dispatch({ type: "QUERY_PRODS", payload: products });
    }
  }, [products]);

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
            <>
              <Col lg={12}>
                <p className="item-count">
                  {products && `${products.length} items found`}
                </p>
              </Col>
              {allprods.map((product) => (
                <ProductInfo product={product} />
              ))}
            </>
          )}

          <div className="pagination">
            {Array(10)
              .fill(1)
              .map((el, i) => (
                <div>{i}</div>
              ))}
          </div>
        </Row>
      )}
    </div>
  );
}

export default ShopCatelog;
