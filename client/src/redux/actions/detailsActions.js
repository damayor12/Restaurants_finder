import {
  ADD_TO_CART,
  CREATE_COMMENT_SUCCESS,
  GET_DETAILS_SUCCESS,
  REMOVE_FROM_CART,
} from '../constants/detailsConstants';
import axios from 'axios';

export const createComment = (RestaurantObj) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let payload = {
    ...RestaurantObj,
    user: JSON.parse(localStorage.getItem('userInfo'))._id,
  };

  try {
    const { data } = await axios.post(
      `/api/restaurants/${RestaurantObj.RestaurantId}/comment`,
      payload,
      config,
    );

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: RestaurantObj,
    });
    
  } catch (error) {}
};

export const getDetails = (RestaurantId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/restaurants/${RestaurantId}/details`);

    dispatch({
      type: GET_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: GET_DETAILS_SUCCESS,
      payload: data,
    });
    // toast.success('!favorited');
  } catch (error) {}
};
