import icons from '../../assets/icons/icons.svg';
import css from './WaterItem.module.css';
import { useState } from 'react';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

const WaterItem = ({ item }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={css.waterCard}>
      <svg className={css.waterGlass} width="38" height="38">
        <use href={`${icons}#icon-water-glass`} />
      </svg>

      <div className={css.waterData}>
        <p className={css.waterAmount}>{item.amountOfWater} ml</p>
        <p className={css.waterTime}>{item.date}</p>
      </div>

      <div className={css.waterChangeContainer}>
        <button className={css.waterChange}>
          <svg className={css.icon} width="14" height="14">
            <use href={`${icons}#icon-edit-2`} />
          </svg>
        </button>
        <button className={css.waterChange} onClick={() => onOpenDeleteModal()}>
          <svg className={css.icon} width="14" height="14">
            <use href={`${icons}#icon-trash-04`} />
          </svg>
        </button>
      </div>
      {showDeleteModal && (
        <DeleteWaterModal
          deleteWaterModalIsOpen={showDeleteModal}
          closeDeleteWaterModal={onCloseDeleteModal}
          waterId={item._id}
        />
      )}
    </div>
    // import { useState } from 'react';

    // import WaterModal from '../WaterModal/WaterModal';

    // import css from './WaterItem.module.css';
    // import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
    // // import sprite from '../../assets/icons/icons.svg';

    // const WaterItem = ({ amountLiters, time, waterId }) => {
    //   const [showWaterModal, setShowWaterModal] = useState(false);
    //   const [showWaterDeleteModal, setShowWaterDeleteModal] = useState(false);
    //   const [operationType, setOperationType] = useState('add');

    //   const onOpenWaterModal = type => {
    //     setOperationType(type);
    //     setShowWaterModal(true);
    //   };

    //   const onOpenWaterDeleteModal = () => {
    //     setShowWaterDeleteModal(true);
    //   };

    //   const onCloseWaterModal = () => {
    //     setShowWaterModal(false);
    //   };

    //   const onCloseWaterDeleteModal = () => {
    //     setShowWaterDeleteModal(false);
    //   };

    //   return (
    //     <li className={css.item}>
    //       <div className={css.container}>
    //         <div>
    //           <svg className={css.icon}>
    //             <use href="/src/assets/icons/icons.svg#icon-water-glass" />
    //           </svg>
    //         </div>
    //         <div className={css.info}>
    //           <p className={css.volume}>{amountLiters} ml</p>
    //           <p className={css.time}>{time} am</p>
    //         </div>
    //         <div className={css.containerIcons}>
    //           <button className={css.btn} onClick={() => onOpenWaterModal('edit')}>
    //             <svg className={css.icons} stroke="#323f47" fill="white">
    //               <use href="/src/assets/icons/icons.svg#icon-edit-2" />
    //             </svg>
    //           </button>
    //           <button className={css.btn} onClick={() => onOpenWaterDeleteModal()}>
    //             <svg className={css.icons} stroke="#323f47" fill="white">
    //               <use href="/src/assets/icons/icons.svg#icon-trash-04" />
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //       {showWaterModal && (
    //         <WaterModal
    //           waterModalOpen={showWaterModal}
    //           closeWaterModal={onCloseWaterModal}
    //           operationType={operationType}
    //         />
    //       )}
    //       {showWaterDeleteModal && (
    //         <DeleteWaterModal
    //           deleteWaterModalIsOpen={showWaterDeleteModal}
    //           closeDeleteWaterModal={onCloseWaterDeleteModal}
    //           waterId={waterId}
    //         />
    //       )}
    //     </li>
  );
};

export default WaterItem;
