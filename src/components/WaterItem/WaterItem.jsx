import { useState } from 'react';

import WaterModal from '../WaterModal/WaterModal';

import css from './WaterItem.module.css';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
// import sprite from '../../assets/icons/icons.svg';

const WaterItem = ({ amountLiters, time, waterId }) => {
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
    <li className={css.item}>
      <div className={css.container}>
        <div className={css.icon}>
          <svg width={38} height={38}>
            <use href="/src/assets/icons/icons.svg#icon-water-glass" />
          </svg>
        </div>
        <div className={css.info}>
          <p className={css.volume}>{amountLiters} ml</p>
          <p className={css.time}>{time} am</p>
        </div>
        <div className={css.icons}>
          <button className={css.btn} onClick={() => onOpenWaterModal('edit')}>
            <svg width={14} height={14} stroke="#323f47" fill="white">
              <use href="/src/assets/icons/icons.svg#icon-edit-2" />
            </svg>
          </button>
          <button className={css.btn} onClick={() => onOpenWaterDeleteModal()}>
            <svg width={14} height={14} stroke="#323f47" fill="white">
              <use href="/src/assets/icons/icons.svg#icon-trash-04" />
            </svg>
          </button>
        </div>
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
    </li>
  );
};

export default WaterItem;
