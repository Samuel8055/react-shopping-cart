import axios from "axios";
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_ORDER,
  FILTER_PRODUCTS_BY_SIZE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("/api/products");
  // const data = await res.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: res.data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  if (size === "") {
    dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: products,
    });
  } else {
    const filteredProducts = products.filter(
      (product) => product.availableSizes.indexOf(size) >= 0
    );
    dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: filteredProducts,
    });
  }
};

export const filterByOrder = (products, order) => (dispatch) => {
  const slicedProducts = products.slice();

  if (order === "latest") {
    slicedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    if (order === "lowest") {
      slicedProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else {
      slicedProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
  }

  dispatch({
    type: FILTER_PRODUCTS_BY_ORDER,
    payload: slicedProducts,
  });
};
