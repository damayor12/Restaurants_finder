import React from 'react';
import { useSelector } from 'react-redux';
import FormModal from '../components/FormModal';
import ReviewsModal from '../components/ReviewsModal';

// import TestModal from '../../../features/sandbox/TestModal';
// import LoginForm from '../../../features/auth/LoginForm';

const ModalManager = () => {


  const modalLookup = {
    FormModal,
    ReviewsModal
  };
  const currentModal = useSelector(state => state.modal)

  let renderedModal;
  if (currentModal) {
    const {modalType, modalProps} = currentModal;
 
    const ModalComponent = modalLookup[modalType]

    renderedModal= <ModalComponent modalProps={modalProps} />
  }
  return (
    <>
  
      <span>{renderedModal}</span>
    </>
  );
}


export default ModalManager;


