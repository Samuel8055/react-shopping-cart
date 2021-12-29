import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (items, product) => (dispatch) => {
  // 'items' => items in cart
  // Instead of passing the cartItems 'items' from dispatch, you can access any value from the state using the getState parameter that is passed along with (dispatch) function right in the action like (dispatch, getState) => {}. And to access the cartItems we just do, getState().cart.cartItems

  const cartItems = items.slice();
  let alreadyExists = false;

  cartItems.forEach((item) => {
    if (item._id === product._id) {
      alreadyExists = true;
      item.count++;
    }
  });

  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: cartItems,
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  const filteredItems = cartItems.filter((item) => item._id !== product._id);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: filteredItems,
  });
  localStorage.setItem("cartItems", JSON.stringify(filteredItems));
};
