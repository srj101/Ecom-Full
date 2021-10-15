import WishListActionTypes from "./wishlist.types";

export const AddItemToWishList = (item) => ({
  type: WishListActionTypes.ADD_ITEM_TO_WISH_LIST,
  payload: item,
});
export const removeItemFromWishList = (item) => ({
  type: WishListActionTypes.REMOVE_ITEM_FROM_WISH_LIST,
  payload: item,
});
