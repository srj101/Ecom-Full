import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function NewsLetter() {
  return (
    <div className="newsletter-wrapper">
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <h2>Newsletter</h2>
              <p>
                Subscribe to our newsletter & get 10% off to your first purchase
              </p>
              <form>
                <input type="text" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewsLetter;
