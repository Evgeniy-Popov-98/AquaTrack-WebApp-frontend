import { useEffect } from 'react';
import Modal from '../Modal/Modal.jsx';

import css from './ModalMessage.module.css';

const ModalMessage = ({ modalMessageIsOpen, closeModalMessage }) => {
  useEffect(() => {
    if (modalMessageIsOpen) {
      const timer = setTimeout(() => {
        closeModalMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalMessageIsOpen, closeModalMessage]);

  return (
    <Modal modalIsOpen={modalMessageIsOpen} closeModal={closeModalMessage}>
      <div className={css.box}>
        <div className={css.textBox}>
          <p className={css.text}>Your data saved successfully!</p>
        </div>
        <div className={css.buttonBox}>
          <button
            className={css.btnLogOut}
            onClick={() => {
              closeModalMessage();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMessage;
