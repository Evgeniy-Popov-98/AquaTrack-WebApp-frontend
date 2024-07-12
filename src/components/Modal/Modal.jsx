import ModalReact from 'react-modal';
import { IoClose } from "react-icons/io5";

import css from "./Modal.module.css";

const Modal = ({modalIsOpen, closeModal, children }) => {
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
        <IoClose className={css.closeIcon} />
      </button>
      {children}
    </ModalReact>
  )
}

export default Modal