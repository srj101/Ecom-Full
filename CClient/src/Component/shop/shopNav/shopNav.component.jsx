import "./shopNav.style.css";
import React from "react";
import { Select, Pagination } from "antd";
import { Container, Row, Col } from "react-bootstrap";

function ShopNav() {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div className="shop-nav">
      <Row>
        <Col lg={10}>
          <div className="mixItUp justify-content-end">
            <div className="nav">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </Col>
        <Col lg={2}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Price Order"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <option key="1" value="lth">
              Low to High
            </option>
            <option key="1" value="htl">
              High to Low
            </option>
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default ShopNav;
