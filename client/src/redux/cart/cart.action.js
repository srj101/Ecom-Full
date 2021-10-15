import CartActionTypes from "./cart.types";

export const AddItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const ClearItemFormCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const removeAll = () => ({
  type: CartActionTypes.REMOVE_ALL,
  payload: [],
});
