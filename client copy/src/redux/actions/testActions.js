import axios from 'axios';
import { ADD_TO_CART_USER } from '../constants/testConstant';

// export const registerUser = async (dataToSubmit) => {
//   const request = axios.get(`api/restaurants`).then((response) => response.data);
//   // let data
//   // try {
//   //   const res = await axios.get(`api/restaurants`);
//   //   data = res.data
//   // } catch (error) {
//   //   console.log(error)
//   // }

//   return {
//     type: ADD_TO_CART_USER,
//     payload: request,
//   };
// }

// export const registerUser = (order) => async (dispatch, getState) => {
//   try {
//     const { data } = await axios.get(`api/restaurants`);

//     dispatch({
//       type: ADD_TO_CART_USER,
//       payload: data,
//     });
//   } catch (error) {}
// };
