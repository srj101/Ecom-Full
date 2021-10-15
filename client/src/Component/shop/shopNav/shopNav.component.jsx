import { Input, Pagination, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./shopNav.style.css";

function ShopNav() {
  const { Search } = Input;
  const Tagg = useSelector(({ term }) => term.term);
  useEffect(() => {
    console.log(Tagg);
  }, [Tagg]);
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch({ type: "LTH_TRIGGER", payload: value });
    console.log(value);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch({ type: "TRIGGER_SEARCH", payload: e.target.value });
  };
  return (
    <div className="shop-nav">
      <Row>
        {/**<Col lg={4}>
          <div className="mixItUp justify-content-end">
            <div className="nav">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </Col> */}
        <Col lg={5}>
          <Search
            style={{ margin: "0 auto", display: "block" }}
            value={Tagg}
            onChange={submitHandle}
            placeholder="Search products..."
          />
        </Col>
        <Col lg={{ span: 2, offset: 5 }}>
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
            <option key="1" value={true}>
              Low to High
            </option>
            <option key="2" value={false}>
              High to Low
            </option>
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default ShopNav;
