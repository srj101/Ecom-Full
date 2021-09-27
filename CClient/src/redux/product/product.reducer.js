const INITIAL_STATE = {
  //SearchQuery: [],
};
const productReducer = (state = {}, action) => {
  switch (action.type) {
    case "TRIGGER_SEARCH":
      return {
        ...state,
        //SearchQuery: [...SearchQuery, action.paylod],
      };
    default:
      return state;
  }
};
export default productReducer;
