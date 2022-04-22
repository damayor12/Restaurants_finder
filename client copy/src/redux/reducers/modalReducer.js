import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

export const modalReducer = (state = null, { type, payload }) => {

  switch (type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = payload;
    console.log('testing,', modalType, modalProps);
      return { modalType, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};
