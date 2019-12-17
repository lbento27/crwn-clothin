import { createSelector } from "reselect";

const selectUser = state => state.user; //input selector gets all state and return a part of it

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
