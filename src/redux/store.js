import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //middleware useful for debugging

import rootReducer from "./root-reducer";

//setup middlewares
const middlewares = [logger];

//Store
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
