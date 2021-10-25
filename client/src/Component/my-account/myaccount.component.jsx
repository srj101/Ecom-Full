import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import UpdateProfileSec from "./updateProfile.component";
import UserInfo from "./userInfo.component";
import { Tabs } from "antd";
import Orders from "./Orders.component";
import { useEffect, useState } from "react";

const MyAccount = () => {
  const userLoginStatus = useSelector((state) => state.user.loggedinStatus);

  const history = useHistory();
  if (!userLoginStatus) {
    history.push("/login");
  }
  const { TabPane } = Tabs;

  const [putkey, setPutkey] = useState();
  function callback(key) {
    setPutkey(key);
  }

  useEffect(() => {}, [putkey]);

  return (
    <div className="user_profile">
      <Container>
        <Row>
          <Col lg={5}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Update Profile" key="1">
                <UpdateProfileSec />
              </TabPane>
              <TabPane tab="Orders" key="2">
                <Orders putkey={putkey} />
              </TabPane>
            </Tabs>
          </Col>
          <Col lg={{ span: 4, offset: 3 }}>
            <UserInfo />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MyAccount;
