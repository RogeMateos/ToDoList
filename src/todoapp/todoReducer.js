export const todoReducer = (initialState = [], action) => {
  switch (action.type) {
    case "[TODO] Add Todo":
      throw new Error("Action [TODO] Add Todo not implemented");

    default:
      return initialState;
  }
};
