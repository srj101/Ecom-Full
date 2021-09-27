import React from "react";
import { Link } from "react-router-dom";
import "./header.style.css";
import FullMenu from "../fullmenu/full-menu.component";
import RightIcons from "../right-icons/right-icons.component";
import Logo from "../../logo.png";
import { Row, Col, Container } from "react-bootstrap";

const Header = () => {
  return (
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
                <img src={Logo} alt="ShoppingKorbo!" />
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
  );
};
export default Header;
