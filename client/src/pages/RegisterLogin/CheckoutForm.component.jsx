import { UserAddOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Form, Input, message, Select, Tabs } from "antd";
import gql from "graphql-tag";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLoginAction } from "../../redux/myAccount/myaccount.action";
const { TabPane } = Tabs;
const { Option } = Select;
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
const ADD_USER = gql`
  mutation ($registrationInput: userinput!) {
    registration(input: $registrationInput)
  }
`;
function CheckoutForm() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const history = useHistory();
  if (cartItems.length === 0) {
    history.replace("/shop");
  }

  function callback(key) {
    console.log(key);
  }
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
    errorPolicy: "all",
  });
  const onFinish = (values) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      country,
      city,
      nickname,
      address,
      prefix,
    } = values;
    const phonenum = prefix + phone;

    addUser({
      variables: {
        registrationInput: {
          firstname,
          lastname,
          email,
          password,
          country,
          city,
          nickname,
          phone: phonenum,
          address,
        },
      },
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+88">+88</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="registration-formm">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "+88",
        }}
        scrollToFirstError
      >
        <Row>
          <Col>
            <div className="error-message">
              <p>
                {loading
                  ? message.loading("Registering, Please give us a moment...")
                  : data && data?.registration
                  ? (message.success("successfully registered"),
                    dispatch(userLoginAction()))
                  : error && message.error(error.message)}
              </p>
            </div>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Basic Information" key="1">
            <Row>
              <Col>
                <Form.Item
                  name="firstname"
                  label="FirstName"
                  tooltip="What is your First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="lastname"
                  label="LastName"
                  tooltip="What is your Last Name"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Last Name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Set Password" key="2">
            <Row>
              <Col>
                <Form.Item
                  name="password"
                  label="Password"
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
              </Col>
              <Col>
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
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Address" key="3">
            <Row>
              <Col>
                <Form.Item
                  name="nickname"
                  label="Company Name"
                  className="label-left"
                  tooltip="What is your company name?"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="address"
                  label="Address"
                  className="label-left"
                  tooltip="Please enter your address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  name="country"
                  label="Country"
                  tooltip="Please enter your country"
                  rules={[
                    {
                      required: true,
                      message: "Please input your country!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="city"
                  label="City"
                  tooltip="Please enter your city"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Row>
          <Col>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                icon={<UserAddOutlined />}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Proceed To Payment
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CheckoutForm;
