import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modalConstants"


export const openModal=(payload)=> {

  return {
    type: OPEN_MODAL,
    payload
  };
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};