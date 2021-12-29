import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_ORDER,
  FILTER_PRODUCTS_BY_SIZE,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        items: action.payload,
        filteredItems: null,
      };

    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload,
      };

    case FILTER_PRODUCTS_BY_ORDER:
      return {
        ...state,
        filteredItems: action.payload,
      };

    default:
      return state;
  }
};
