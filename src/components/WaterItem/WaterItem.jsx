import icons from '../../assets/icons/icons.svg';
import css from './WaterItem.module.css';
import { useState } from 'react';
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
    <div className={css.waterCard}>
      <svg className={css.waterGlass} width="38" height="38">
        <use href={`${icons}#icon-water-glass`} />
      </svg>

      <div className={css.waterData}>
        <p className={css.waterAmount}>{item.amountOfWater} ml</p>
        <p className={css.waterTime}>{item.date}</p>
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
