export const SearchTrigger = (state) => ({
  type: "TRIGGER_SEARCH",
  payload: state.tag,
});

export const CatTrigger = (state) => ({
  type: "CAT_TRIGGER",
  payload: state.Cat,
});

export const colorTrigger = (state) => ({
  type: "COLOR_TRIGGER",
  payload: state.Color,
});
