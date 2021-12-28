import { combineReducers } from "redux";
import { productsReducer } from "./productReducers";

export const allReducers = combineReducers({
  products: productsReducer,
});
