import { useMutation } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { Avatar, Spin, message } from "antd";
import { Image } from "cloudinary-react";
import { UserOutlined } from "@ant-design/icons";
import gql from "graphql-tag";

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
      email
      id
      orders {
        id
      }
    }
  }
`;

function UserInfo() {
  const dispatch = useDispatch();
  const userLoginStatus = useSelector((state) => state.user.loggedinStatus);
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    errorPolicy: "all",
  });
  const [userInfo, setUserInfo] = useState({});
  const [uploadState, setUploadState] = useState();
  const onDropp = async (acceptedFiles) => {
    setUploadState(true);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "bauq7czk");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dp5tpp02p/upload",
      formData
    );
    updateUser({
      variables: {
        upDateProfileInput: { profilepic: res.data.public_id },
      },
    });
    if (res) {
      setUploadState(false);
    }
  };
  useEffect(() => {
    if (data) {
      setUserInfo(data.upDateProfile);
    }
  }, [data, userInfo]);

  useEffect(() => {
    dispatch({
      type: "USER_LOGGEDIN",
      userInfo,
    });
  }, [userInfo, userLoginStatus]);
  const userInfoo = useSelector((state) => state.user.userInfo);
  if (error) {
    return (
      <div className="error-message">
        <p>{error && message.error(error.message)}</p>
      </div>
    );
  }

  return (
    <div className="text-center userinfo">
      <Dropzone onDrop={onDropp}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {loading ? (
                <Spin />
              ) : userInfoo && userInfoo?.profilepic ? (
                <Avatar
                  size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  src={
                    <Image
                      cloudName="dp5tpp02p"
                      publicId={userInfoo && userInfoo?.profilepic}
                      alt={userInfoo && userInfoo?.firstname}
                    />
                  }
                />
              ) : (
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <h2>HI, {userInfoo && userInfoo?.nickname}</h2>
      <p>{userInfoo && userInfoo?.email}</p>
      <p>
        {userInfoo && userInfoo?.country},{userInfoo && userInfoo?.city}
      </p>
      <p>{userInfoo && userInfoo?.address}</p>
    </div>
  );
}

export default UserInfo;
