import {
  CLEAR_POST,
  CREATE_POST_SUCCESS,
  EDIT_AFTER_SUBMIT,
  GET_FAVORITES,
} from '../constants/restaurantsConstants';
import { ADD_FAVORITES, REMOVE_FAVORITES } from '../constants/restaurantsConstants';

export const restaurantsReducer = (

  state = { posts: [], newpost: [], favoriteList: [] },
  { type, payload },
 
) => {
  switch (type) {
    case CREATE_POST_SUCCESS:
      return { ...state, posts: payload };
    case EDIT_AFTER_SUBMIT:
      return { ...state, newpost: payload };
    case CLEAR_POST:
      return { ...state, posts: [] };
    case REMOVE_FAVORITES: //
      return {
        ...state,
        favoriteList: {
          favoriteCount: payload.favoriteCount - 1,
          favorites: payload.data,
          favorite_cards:state.favoriteList.favorite_cards.filter((fav) => fav._id !== payload.restaurant_data),
        },
        
      };

    case ADD_FAVORITES:
      return {
        ...state,
        favoriteList: {
          favoriteCount: payload.favoriteCount + 1,
          favorites: payload.data,
          favorite_cards: [...state.favoriteList.favorite_cards, payload.restaurant_data],
        },
      };
    case GET_FAVORITES:
      return { 
        ...state, 
        favoriteList: payload
      };
    default:
      return state;
  }
};
