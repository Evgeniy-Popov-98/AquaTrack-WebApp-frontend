import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations.js';

import Modal from '../Modal/Modal.jsx';

import css from './DeleteWaterModal.module.css';

const DeleteWaterModal = ({
  deleteWaterModalIsOpen,
  closeDeleteWaterModal,
  item,
  refreshData,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!item._id) {
      console.error('Invalid ID');
      return;
    }
    await dispatch(deleteWater(item._id));
    refreshData();
  };

  const handleClose = () => {
    closeDeleteWaterModal();
  };

  return (
    <Modal
      modalIsOpen={deleteWaterModalIsOpen}
      closeModal={closeDeleteWaterModal}
    >
      <div className={css.box}>
        <div className={css.textBox}>
          <h3 className={css.title}>Delete entry</h3>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={css.buttonBox}>
          <button className={css.btnDelete} onClick={handleDelete}>
            Delete
          </button>
          <button className={css.btnCancel} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

//   return (
//     <Modal
//       modalIsOpen={deleteWaterModalIsOpen}
//       closeModal={closeDeleteWaterModal}
//     >
//       <div className={css.box}>
//         <div className={css.textBox}>
//           <h3 className={css.title}>Delete entry</h3>
//           <p className={css.text}>Are you sure you want to delete the entry?</p>
//         </div>
//         <div className={css.buttonBox}>
//           <button
//             className={css.btnDelete}
//             onClick={() => {
//               closeDeleteWaterModal();
//               dispatch(deleteWater(waterId));
//             }}
//           >
//             Delete
//           </button>
//           <button
//             className={css.btnCancel}
//             onClick={() => closeDeleteWaterModal(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

export default DeleteWaterModal;
