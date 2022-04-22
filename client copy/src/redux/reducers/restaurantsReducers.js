import { CLEAR_POST, CREATE_POST_SUCCESS, EDIT_AFTER_SUBMIT } from '../constants/restaurantsConstants';
import { ADD_FAVORITES, REMOVE_FAVORITES } from '../constants/restaurantsConstants';



export const restaurantsReducer = (state = { posts: [], newpost: [], favoriteList: [] }, { type, payload }) => {
  switch (type) {
    case CREATE_POST_SUCCESS:
      return { ...state, posts: payload };
    case EDIT_AFTER_SUBMIT:
      return { ...state, newpost: payload };
    case CLEAR_POST:
      return { ...state, posts: [] };
    case REMOVE_FAVORITES: //
       return { ...state, favoriteList: [...state.favoriteList, payload] };
    case ADD_FAVORITES:
      return { ...state, favoriteList: [...state.favoriteList, payload] };
    default:
      return state; 

  }
  console.log();
};
function add(){}//

