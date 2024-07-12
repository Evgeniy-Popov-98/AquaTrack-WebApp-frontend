import Modal from "../Modal/Modal.jsx"

import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = ({deleteWaterModalIsOpen, closeDeleteWaterModal}) => {
  return (
    <Modal modalIsOpen={deleteWaterModalIsOpen} closeModal={closeDeleteWaterModal}>
        <div className={css.box}>
            <div className={css.textBox}>
                <h3 className={css.title}>Delete entry</h3>
                <p  className={css.text}>Are you sure you want to delete the entry?</p>
            </div>
            <div className={css.buttonBox}>
                <button className={css.btnLogOut}>Delete</button>
                <button className={css.btnCancel} onClick={()=>closeDeleteWaterModal()}>Cancel</button>
            </div>
        </div>
    </Modal>
  )
}

export default DeleteWaterModal