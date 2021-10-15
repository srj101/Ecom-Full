import { AddItemToWish, removeItemFromWish } from "./wish.utils";
import WishListActionTypes from "./wishlist.types";
const INITIAN_STATE = {
  wishlist: [],
};
const wishReducer = (state = INITIAN_STATE, action) => {
  switch (action.type) {
    case WishListActionTypes.ADD_ITEM_TO_WISH_LIST:
      return {
        ...state,
        wishlist: AddItemToWish(state.wishlist, action.payload),
      };

    case WishListActionTypes.REMOVE_ITEM_FROM_WISH_LIST:
      return {
        ...state,
        wishlist: removeItemFromWish(state.wishlist, action.payload),
      };

    default:
      return state;
  }
};
export default wishReducer;
