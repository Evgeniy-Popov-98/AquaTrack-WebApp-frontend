import { useState } from 'react';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';

import icons from '../../assets/icons/icons.svg';
import css from './WaterItem.module.css';

const WaterItem = ({ item, refreshData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState('edit');

  const onOpenWaterModal = type => {
    setOperationType(type);
    setShowWaterModal(true);
  };

  const onCloseWaterModal = () => {
    setShowWaterModal(false);
    refreshData();
  };

  const onOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={css.container}>
      <svg className={css.icon} width="38" height="38">
        <use href={`${icons}#icon-water-glass`} />
      </svg>

      <div className={css.info}>
        <p className={css.volume}>{item.amountOfWater} ml</p>
        <p className={css.time}>{item.date} am</p>
      </div>

      <div className={css.containerIcons}>
        <button className={css.btn} onClick={() => onOpenWaterModal()}>
          <svg className={css.icons} stroke="#323f47" fill="white">
            <use href={`${icons}#icon-edit-2`} />
          </svg>
        </button>
        <button className={css.btn} onClick={onOpenDeleteModal}>
          <svg className={css.icons} stroke="#323f47" fill="white">
            <use href={`${icons}#icon-trash-04`} />
          </svg>
        </button>
      </div>
      {showDeleteModal && (
        <DeleteWaterModal
          deleteWaterModalIsOpen={showDeleteModal}
          closeDeleteWaterModal={onCloseDeleteModal}
          refreshData={refreshData}
          item={item}
        />
      )}
      {showWaterModal && (
        <WaterModal
          waterModalOpen={showWaterModal}
          closeWaterModal={onCloseWaterModal}
          operationType={operationType}
          item={item}
        />
      )}
    </div>
  );
};

export default WaterItem;
