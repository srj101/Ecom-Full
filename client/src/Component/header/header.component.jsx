import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.style.css";
import FullMenu from "../fullmenu/full-menu.component";
import RightIcons from "../right-icons/right-icons.component";
import { Row, Col, Container } from "react-bootstrap";
import { notification } from "antd";
import { Affix } from "antd";
const Header = () => {
  useEffect(() => {
    notification.open({
      message: "Hi",
      description: "Welcome To Ecom!",
      className: "custom-class",
      style: {
        width: 300,
      },
      placement: "topRight",
    });
  }, []);
  const [top, setTop] = useState();
  return (
    <Affix offsetTop={top}>
      <div className="header_container">
        <Container>
          <Row>
            {/* Menu Bar */}
            <Col>
              <FullMenu />
            </Col>
            {/* Logo Section */}
            <Col>
              <div className="logo">
                <Link to="/">
                  <h2>
                    Shopp<span>ing</span>Korbo
                  </h2>
                </Link>
              </div>
            </Col>
            {/* Search,Whitelist,Login,Cart */}
            <Col>
              <RightIcons />
            </Col>
          </Row>
        </Container>
      </div>
    </Affix>
  );
};
export default Header;
