const INITIAN_STATE = {
  loggedinStatus: false,
  userInfo: {},
};

const userReducer = (state = INITIAN_STATE, action) => {
  switch (action.type) {
    case "USER_LOGGEDIN":
      return { ...state, loggedinStatus: true, userInfo: action.userInfo };
    case "USER_LOGGEDOUT":
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return { ...state, loggedinStatus: false };
    default:
      return state;
  }
};

export default userReducer;
