import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/detailsConstants';

export const cartReducer = (state = { cart: [] }, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, payload] };
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((cartItem) => cartItem.productID !== payload) };
    default:
      return state;
  }
};
