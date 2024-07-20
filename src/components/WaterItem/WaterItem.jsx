import { useState } from 'react';

import WaterModal from '../WaterModal/WaterModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

import css from './WaterItem.module.css';

const WaterItem = ({ amountOfWater, date, waterId }) => {
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showWaterDeleteModal, setShowWaterDeleteModal] = useState(false);
  const [operationType, setOperationType] = useState('add');

  const onOpenWaterModal = type => {
    setOperationType(type);
    setShowWaterModal(true);
  };

  const onOpenWaterDeleteModal = () => {
    setShowWaterDeleteModal(true);
  };

  const onCloseWaterModal = () => {
    setShowWaterModal(false);
  };

  const onCloseWaterDeleteModal = () => {
    setShowWaterDeleteModal(false);
  };

  return (
    <div className={css.container}>
      <div>
        <svg className={css.icon}>
          <use href="/src/assets/icons/icons.svg#icon-water-glass" />
        </svg>
      </div>
      <div className={css.info}>
        <p className={css.volume}>{amountOfWater} ml</p>
        <p className={css.time}>{date} am</p>
      </div>
      <div className={css.containerIcons}>
        <button className={css.btn} onClick={() => onOpenWaterModal('edit')}>
          <svg className={css.icons} stroke="#323f47" fill="white">
            <use href="/src/assets/icons/icons.svg#icon-edit-2" />
          </svg>
        </button>
        <button className={css.btn} onClick={() => onOpenWaterDeleteModal()}>
          <svg className={css.icons} stroke="#323f47" fill="white">
            <use href="/src/assets/icons/icons.svg#icon-trash-04" />
          </svg>
        </button>
      </div>
      {showWaterModal && (
        <WaterModal
          waterModalOpen={showWaterModal}
          closeWaterModal={onCloseWaterModal}
          operationType={operationType}
        />
      )}
      {showWaterDeleteModal && (
        <DeleteWaterModal
          deleteWaterModalIsOpen={showWaterDeleteModal}
          closeDeleteWaterModal={onCloseWaterDeleteModal}
          waterId={waterId}
        />
      )}
    </div>
  );
};

export default WaterItem;
