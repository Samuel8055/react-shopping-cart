import { combineReducers } from "redux";
import { cartReducers } from "./cartReducers";
import { productsReducer } from "./productReducers";

export const allReducers = combineReducers({
  products: productsReducer,
  cart: cartReducers,
});
