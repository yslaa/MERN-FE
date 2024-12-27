import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/reducer";
import { auth, cart } from "./hooks";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
  cart,
});
