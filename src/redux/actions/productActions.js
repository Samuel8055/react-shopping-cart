import axios from "axios";
import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("http://localhost:5000/api/products");
  const data = await res.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
