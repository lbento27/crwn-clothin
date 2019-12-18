import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //this refers that we want to use window.localStorage

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"] //cart the reducer that we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);
