import { combineReducers } from "redux";
import productReducer from "./product/product.reducer";
import { cartReducer } from "./cart/cart.reducer";

const rootReducer = combineReducers({
  // All the reducers goes here
  term: productReducer,
  cart: cartReducer,
});
export default rootReducer;
