import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import createReducer from "./reducers";

const middleware = [thunk];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(createReducer(), enhancer);

export default store;