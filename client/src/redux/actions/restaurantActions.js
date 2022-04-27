import {
  CREATE_POST_SUCCESS,
  EDIT_AFTER_SUBMIT,
  CLEAR_POST,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  GET_FAVORITES,
  SET_FAVORITES,
  DECREASE_FAVORITES,
  INCREASE_FAVORITES,
} from '../constants/restaurantsConstants';
import axios from 'axios';

import { toast } from 'react-toastify';

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
    type: CLEAR_POST,
  };
};

export const addToFavorites = (restaurant_data) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = {
    _id: JSON.parse(localStorage.getItem('userInfo'))._id,
    restaurandID: restaurant_data._id,
  };

  try {
    const { data } = await axios.post(`api/restaurants/favorites`, payload, config);

    const {
      restaurants: { favoriteCount },
    } = getState();

    if (data) {
      dispatch({
        type: ADD_FAVORITES,
        payload: { data, favoriteCount, restaurant_data },
      });
    }

    toast.success('favorited!');
  } catch (error) {}
};

export const removeFromFavorites = (restaurant_data) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = { _id: JSON.parse(localStorage.getItem('userInfo'))._id };

  try {
    const { data } = await axios.delete(
      `api/restaurants/favorites/${restaurant_data._id}`,
      payload,
      config,
    );

    const {
      restaurants: { favoriteCount },
    } = getState();

    if (data) {
      dispatch({
        type: REMOVE_FAVORITES,
        payload: { data, favoriteCount, restaurant_data },
      });
    }

    toast.success('unfavorited!');
  } catch (error) {}
};

export const getFavorites = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = { _id: JSON.parse(localStorage.getItem('userInfo'))._id };

  try {
    const { data } = await axios.post(`api/restaurants/favorites/all`, payload, config);

    dispatch({
      type: GET_FAVORITES,
      payload: { ...data._doc, favoriteCount: data.favoriteCount },
    });
    // toast.success('!favorited');
  } catch (error) {}
};

export const increaseCounter = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = { _id: JSON.parse(localStorage.getItem('userInfo'))._id };

  try {
    const { data } = await axios.post(`api/restaurants/favorites/all`, payload, config);

    dispatch({
      type: GET_FAVORITES,
      payload: { ...data._doc, favoriteCount: data.favoriteCount },
    });
    // toast.success('!favorited');
  } catch (error) {}
};

export const setFavoritesCount = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let payload = {
    _id: JSON.parse(localStorage.getItem('userInfo'))._id,
    favoriteCount: true,
  };

  try {
    const { data } = await axios.post(`api/restaurants/favorites/all`, payload, config);

    dispatch({
      type: SET_FAVORITES,
      payload: data.count,
    });
  } catch (error) {}
};

export const increaseFavoritesCount = () => (dispatch, getState) => {
  const favorites = getState();

  dispatch({
    type: INCREASE_FAVORITES,
    payload: favorites,
  });
};

export const decreaseFavoritesCount = () => (dispatch, getState) => {
  const {
    restaurants: { likeCounter },
  } = getState();

  dispatch({ type: DECREASE_FAVORITES, payload: likeCounter });
};
