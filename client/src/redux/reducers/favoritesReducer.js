import {
  DECREASE_FAVORITES,
  INCREASE_FAVORITES,
  SET_FAVORITES,
} from '../constants/restaurantsConstants'

export const favoritesReducer = (state = { likeCounter: 0 }, { type, payload }) => {
  switch (type) {
    case INCREASE_FAVORITES:
      return { ...state, likeCounter: state.likeCounter + 1 };
    case DECREASE_FAVORITES:
      return { ...state, likeCounter: state.likeCounter - 1 };
    case SET_FAVORITES:
      return { ...state, likeCounter: payload };

    default:
      return state;
  }
};
