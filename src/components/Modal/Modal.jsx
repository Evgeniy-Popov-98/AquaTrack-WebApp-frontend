import ModalReact from 'react-modal';

import sprite from '../../assets/icons/icons.svg';

import css from "./Modal.module.css";
import { useEffect } from 'react';

const Modal = ({ modalIsOpen, closeModal, children }) => {
  useEffect(() => {
    // При відкритті модального вікна приховати скролл на фоні
    document.body.style.overflow = modalIsOpen ? 'hidden' : 'auto';
    
    // Відновити скролл при закритті модального вікна
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalIsOpen]);
  return (
    <ModalReact
      isOpen={modalIsOpen}
      overlayClassName="ReactModal__Overlay"
      className="ReactModal__Content"
      closeTimeoutMS={300}
      onRequestClose={() => closeModal()}
      ariaHideApp={false}
    >
      <button className={css.closeBtn} onClick={() => closeModal()}>
        <svg className={css.closeIcon} width="16" height="16">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      {children}
    </ModalReact>
  )
}

export default Modal