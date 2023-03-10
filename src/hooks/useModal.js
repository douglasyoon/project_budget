import { useState } from 'react';

const useModal = () => {
  const [openedModal, setOpenedModal] = useState(null);
  const openModal = (Component) => {
    setOpenedModal(Component);
  };
  const closeModal = () => {
    setOpenedModal(null);
  };
  return { openedModal, openModal, closeModal };
};

export default useModal;
