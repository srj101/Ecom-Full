export const AddItemToWish = (wishItems, wishItemToAdd) => {
  const existingWishItem = wishItems.find(
    (wishItem) => wishItem.id === wishItemToAdd.id
  );
  if (existingWishItem) {
    return [...wishItems];
  }
  return [...wishItems, { ...wishItemToAdd }];
};

export const removeItemFromWish = (wishItems, wishItemToRemove) => {
  const existingWishItem = wishItems.find(
    (wishItem) => wishItem.id === wishItemToRemove.id
  );

  if (existingWishItem) {
    return wishItems.filter((wishItem) => wishItem.id !== wishItemToRemove.id);
  }
};
