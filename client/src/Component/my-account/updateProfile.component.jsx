import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./myaccount.style.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const UPDATE_USER = gql`
  mutation ($upDateProfileInput: updateUser) {
    upDateProfile(input: $upDateProfileInput) {
      firstname
      lastname
      nickname
      profilepic
      country
      city
      phone
      address
      confirm
      email
      id
      orders {
        id
      }
    }
  }
`;

const USER_INFO = gql`
  query {
    userProfile {
      firstname
      lastname
      nickname
      profilepic
      country
      city
      phone
      confirm
      address
      email
      id
      orders {
        id
      }
    }
  }
`;

function UpdateProfileSec() {
  const client = useApolloClient();
  const history = useHistory();
  const dispatch = useDispatch();

  const [updateUser, updatedUser] = useMutation(UPDATE_USER, {
    errorPolicy: "all",
  });

  const { loading, error, data } = useQuery(USER_INFO, {
    errorPolicy: "all",
  });
  const [userInfo, setUserInfo] = useState();
  const confirmState = userInfo?.confirm;
  useEffect(() => {
    if (data) {
      setUserInfo(data.userProfile);
      dispatch({
        type: "USER_LOGGEDIN",
        userInfo: data.userProfile,
      });
    }
    if (updateUser.data) {
      setUserInfo(updateUser.data.upDateProfile);
      dispatch({
        type: "USER_LOGGEDIN",
        userInfo: updateUser.data.upDateProfile,
      });
    }
  }, [data, confirmState]);

  const onFinish = (values) => {
    const { phone, firstname, lastname, address, nickname, country, city } =
      values;
    updateUser({
      variables: {
        upDateProfileInput: {
          phone,
          firstname,
          lastname,
          address,
          nickname,
          country,
          city,
        },
      },
    });

    if (!updatedUser.error) {
      message.success("Saved!");
    }
  };

  if (loading & !data) {
    return "loading....";
  }

  if (!confirmState) {
    return (
      <div className="registration-formm">
        <Row>
          <Col>
            <Alert variant="warning">
              Please confirm your email to procced!
            </Alert>

            <Button
              type="ghost"
              className="logoutbtn"
              onClick={(e) => {
                e.preventDefault();
                client.clearStore();
                dispatch({
                  type: "USER_LOGGEDOUT",
                  payload: { userInfo },
                });

                history.push("/login");
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="firstname"
          label="FirstName"
          tooltip="What is your First Name"
          rules={[
            {
              message: "Please input your First Name!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={userInfo && userInfo.firstname} />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="LastName"
          tooltip="What is your Last Name"
          rules={[
            {
              message: "Please input your Last Name!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={userInfo && userInfo.lastname} />
        </Form.Item>

        <Form.Item name={["nickname"]} label="Nick Name">
          <Input placeholder={userInfo && userInfo.nickname} />
        </Form.Item>
        <Form.Item name={["country"]} label="Country">
          <Input placeholder={userInfo && userInfo.country} />
        </Form.Item>
        <Form.Item name={["city"]} label="City">
          <Input placeholder={userInfo && userInfo.city} />
        </Form.Item>
        <Form.Item name={["address"]} label="Address">
          <Input placeholder={userInfo && userInfo.address} />
        </Form.Item>

        <Form.Item name={["phone"]} label="Phone">
          <Input placeholder={userInfo && userInfo.phone} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={updatedUser.loading}
          >
            Save
          </Button>
          <Button
            type="ghost"
            className="logoutbtn"
            onClick={(e) => {
              e.preventDefault();
              client.clearStore();
              dispatch({
                type: "USER_LOGGEDOUT",
                payload: { userInfo },
              });

              history.push("/login");
            }}
          >
            Logout
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateProfileSec;
