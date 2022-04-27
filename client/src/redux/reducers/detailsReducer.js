import { CREATE_COMMENT_SUCCESS, GET_DETAILS_SUCCESS } from '../constants/detailsConstants';

export const detailsReducer = (state = { details: {}, cart: [] }, { type, payload }) => {
  switch (type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        details: {
          ...state.details,
          customerReviews: [...state.details.customerReviews, payload],
          totalReviews: state.details.totalReviews + 1,
        },
      };
    case GET_DETAILS_SUCCESS:
      return { ...state, details: payload };

    default:
      return state;
  }
};
