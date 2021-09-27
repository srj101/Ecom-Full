const INITIAL_STATE = {
  tag: "",
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TRIGGER_SEARCH":
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
