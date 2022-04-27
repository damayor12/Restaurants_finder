const { ADD_TO_CART_USER } = require('../constants/testConstant');

const testfunc = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_USER:
      return {
        ...state,
        testData: {
          ...state.testData,
          test: action.payload,
      },
      };

    default:
      return state;
  }
};

export default testfunc;
