import { CREATE_POST_SUCCESS,EDIT_AFTER_SUBMIT, CLEAR_POST, ADD_FAVORITES, REMOVE_FAVORITES } from '../constants/restaurantsConstants';


export const createPost = (payload) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload,
  };
};

export const editPost = (payload) => {
  return {
    type: EDIT_AFTER_SUBMIT,
    payload,
  };
};

export const clearPost = () => {
  return {
    type: CLEAR_POST
  };
};


export const addToFavorites = () => {
  return {
    type: ADD_FAVORITES,
  };
};

export const removeFromFavorites = () => {
  return {
    type: REMOVE_FAVORITES,
  };
};



