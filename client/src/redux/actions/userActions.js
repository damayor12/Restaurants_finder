import axios from 'axios';
import { toast } from 'react-toastify';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../constants/userConstants';

export const registerUser = (passed_data) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axios.post(`api/users/register`, passed_data, config);

    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
  } catch (error) {
    // toast.error(error.message);
  }
};

export const loginUser = (passed_data) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axios.post('api/users/login', passed_data, config);

    if (data) {
      dispatch({
        type: LOGIN_USER,
        payload: data,
      });
      toast.success('Log in successful');
      localStorage.setItem('userInfo', JSON.stringify(data));
      return Promise.resolve();
    } else {
      throw new Error('Something wrong');
    }
  } catch (error) {
    toast.error(error.message || error.response.data.message);
    return Promise.reject();
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  localStorage.removeItem('userInfo');

  dispatch({
    type: LOGOUT_USER,
  });
  toast.success('logged out');
};
