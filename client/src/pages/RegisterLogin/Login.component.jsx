import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/myAccount/myaccount.action";

const LOGIN_QUERY = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword)
  }
`;

const LoginForm = () => {
  const history = useHistory();

  const [getLogin, { data, loading, error }] = useMutation(LOGIN_QUERY, {
    errorPolicy: "all",
  });
  const dispatch = useDispatch();

  const userLoginStatus = useSelector((state) => state.user.loggedinStatus);
  if (userLoginStatus) {
    history.push("/myaccount");
  }
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;
    getLogin({
      variables: { loginEmail: email, loginPassword: password },
    });
  };

  return (
    <Container>
      <div className="error-message">
        <p>
          {loading
            ? message.loading("Login in, Please give us a moment...")
            : data && data?.login
            ? (dispatch(userLoginAction()),
              message.success("successfully Logged in"),
              history.push("/myaccount"))
            : error && message.error(error.message)}
        </p>
      </div>
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
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link className="login-form-forgot" to="/forget-pass">
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <Link to="/checkout">Create A Account Real Quick!</Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
