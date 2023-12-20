'use client'
import { useState } from 'react';

const useHandleModal = () => {

  const [showModal, setShowModal] = useState(false);
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  return { showModal, handleModalClose, handleModalShow };
};

export default useHandleModal;