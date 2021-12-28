import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allReducers } from "./redux/reducers";

const initialState = {};

const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
