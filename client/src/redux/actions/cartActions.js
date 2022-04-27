import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/detailsConstants';

export const addToCart = (payload) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload,
  });
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
