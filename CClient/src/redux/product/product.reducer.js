const INITIAL_STATE = {
  tag: "",
  cat: "",
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TRIGGER_SEARCH":
      return {
        ...state,
        term: action.payload,
      };

    case "CAT_TRIGGER":
      return {
        ...state,
        cat: action.payload,
      };
    case "COLOR_TRIGGER":
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
