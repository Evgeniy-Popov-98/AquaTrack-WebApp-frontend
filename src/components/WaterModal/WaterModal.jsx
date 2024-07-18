import Modal from '../Modal/Modal.jsx';
import WaterForm from '../WaterForm/WaterForm.jsx';
import css from './WaterModal.module.css';

const WaterModal = ({ waterModalOpen, closeWaterModal, operationType }) => {
  if (!waterModalOpen) return null;

  let swithModalDelete = false;

  const title =
    operationType === 'add' ? 'Add Water' : 'Edit the entered amount of water';
  const value =
    operationType === 'add' ? 'Choose a value:' : 'Correct entered data:';

  if (operationType === 'delete') {
    swithModalDelete = true;
  }
  return swithModalDelete ? (
    <Modal modalIsOpen={waterModalOpen} closeModal={closeWaterModal}>
      <div className={css.waterModal}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalValue}>{value}</p>
        <WaterForm closeWaterModal={closeWaterModal} />
      </div>
    </Modal>
  ) : (
    <Modal modalIsOpen={waterModalOpen} closeModal={closeWaterModal}>
      <div className={css.waterModal}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalValue}>{value}</p>
        <WaterForm closeWaterModal={closeWaterModal} />
      </div>
    </Modal>
  );
};

export default WaterModal;
