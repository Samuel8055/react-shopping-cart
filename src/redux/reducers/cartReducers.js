import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
