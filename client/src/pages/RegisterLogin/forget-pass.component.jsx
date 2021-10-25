import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Container, Row, Col } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const FORGOT_PASS = gql`
  mutation ($email: String!) {
    forgotPassword(email: $email)
  }
`;

const ForgetForm = () => {
  const [forGotPassword, { data, loading, error }] = useMutation(FORGOT_PASS, {
    errorPolicy: "all",
  });
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    forGotPassword({
      variables: {
        email: values.email,
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="error-message">
            <p>
              {loading
                ? message.loading("Please give us a moment...")
                : message.success("Please check you email")}
              {error ? error && message.error(error.message) : ""}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={4}>
          <div className="login-form">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Send Password Reset Email
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetForm;
