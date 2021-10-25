import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { message } from "antd";
import { userConfirmEmail } from "../redux/myAccount/myaccount.action";
import { Container, Row, Col } from "react-bootstrap";

const CONFRIM_EMAIL = gql`
  mutation ($token: String!) {
    confirmEmail(token: $token)
  }
`;

function ConfirmEmail() {
  const email = useSelector((state) => state.user.userInfo.email);
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [mutateFunction, { data, loading, error }] = useMutation(
    CONFRIM_EMAIL,
    {
      errorPolicy: "all",
    }
  );
  useEffect(() => {
    mutateFunction({ variables: { token: token } });
  }, []);

  if (error) {
    return "Something went wrong!";
  }
  if (data?.confirmEmail) {
    message.success(data?.confirmEmail);
    history.replace("/myaccount");
    dispatch(userConfirmEmail());
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>Please wait a few moments</div>
        </Col>
      </Row>
    </Container>
  );
}

export default ConfirmEmail;
