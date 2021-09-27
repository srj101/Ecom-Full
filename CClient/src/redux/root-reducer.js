import { combineReducers } from "redux";
import productReducer from "./product/product.reducer";

const rootReducer = combineReducers({
  // All the reducers goes here
  products: productReducer,
});
export default rootReducer;
