import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogOutAction } from "./myaccount.action";
function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(userLogOutAction());
    history.push("/");
  }, []);
  return <div>ok</div>;
}

export default Logout;
