export const userLoginAction = (userInfo) => ({
  type: "USER_LOGGEDIN",
  userInfo,
});

export const userLogOutAction = (userInfo) => ({
  type: "USER_LOGGEDOUT",
  userInfo,
});

export const userConfirmEmail = () => ({
  type: "CONFIRM_EMAIL",
});
