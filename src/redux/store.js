import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //middleware useful for debugging

import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";

//setup middlewares
const middlewares = [logger];

//Store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//version os store but persisted
export const persistor = persistStore(store);

export default { store, persistor };
