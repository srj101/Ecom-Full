import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productReducer from "./product/product.reducer";
import cartReducer from "./cart/cart.reducer";
import wishReducer from "./wishList/wish.reducer";
import storage from "redux-persist/lib/storage";
import userReducer from "./myAccount/myaccount.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wish", "user"],
};

const rootReducer = combineReducers({
  // All the reducers goes here
  term: productReducer,
  cart: cartReducer,
  wish: wishReducer,
  user: userReducer,
});
export default persistReducer(persistConfig, rootReducer);
