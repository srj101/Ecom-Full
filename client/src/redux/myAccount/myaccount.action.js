export const userLoginAction = () => ({ type: "USER_LOGGEDIN" });

export const userLogOutAction = (userInfo) => ({
  type: "USER_LOGGEDOUT",
  userInfo,
});
