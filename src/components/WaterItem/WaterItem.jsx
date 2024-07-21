import { useState } from 'react';

import WaterModal from '../WaterModal/WaterModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';

const WaterItem = ({ item, refreshData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState('edit');

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

      <div className={css.waterChangeContainer}>
        <button className={css.waterChange} onClick={() => onOpenWaterModal()}>
          <svg className={css.icon} width="14" height="14">
            <use href={`${icons}#icon-edit-2`} />
          </svg>
        </button>
        <button className={css.waterChange} onClick={onOpenDeleteModal}>
          <svg className={css.icon} width="14" height="14">
            <use href={`${icons}#icon-trash-04`} />
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
