
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, LOADING } from '../constants/userConstants';

const userReducer =  (state = {loading: true}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload, loading: false };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload, loading: false };
    case LOGOUT_USER:
      return {};
  
    default:
      return state;
  }
}

export default userReducer;
