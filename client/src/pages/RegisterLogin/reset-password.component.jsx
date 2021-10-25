import { Form, Input, Button, message } from "antd";
import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { UserAddOutlined } from "@ant-design/icons";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

const RESET_PASS = gql`
  mutation (
    $password: String!
    $resetPaswordToken2: String!
    $resetPaswordEmail2: String!
  ) {
    resetPasword(
      password: $password
      token: $resetPaswordToken2
      email: $resetPaswordEmail2
    )
  }
`;

function Resetpassword() {
  const [resetPass, { data, loading, error }] = useMutation(RESET_PASS, {
    errorPolicy: "all",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const { token, email } = useParams();
  const client = useApolloClient();
  const onFinish = (values) => {
    console.log({
      password: values.confirm,
      Token: token,
      Email: email,
    });
    resetPass({
      variables: {
        password: values.confirm,
        resetPaswordToken2: token,
        resetPaswordEmail2: email,
      },
    });

    client.clearStore();
    dispatch({
      type: "USER_LOGGEDOUT",
      payload: {},
    });
    message.success("Password Reset Success!");

    history.replace("/login");
  };
  return (
    <div className="reset-form">
      <Container>
        <Row>
          <Col>
            <div className="error-message">
              <p>
                {loading ? message.loading("Please give us a moment...") : ""}
                {error ? error && message.error(error.message) : ""}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                token: token,
              }}
              scrollToFirstError
            >
              <Row>
                <Col>
                  <div className="error-message"></div>
                </Col>
              </Row>

              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Minimum length is six!",
                  },
                  {
                    pattern: new RegExp(
                      "^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,}).{6,}$"
                    ),
                    message: `Password is too easy! Use at least 1 numericals`,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  icon={<UserAddOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resetpassword;
