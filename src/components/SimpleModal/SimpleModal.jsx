import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

import css from "./SimpleModal.module.css";

const SimpleModal = ({modalIsOpen, closeModal }) => {
  return (
    <Modal
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
    </Modal>
  )
}

export default SimpleModal