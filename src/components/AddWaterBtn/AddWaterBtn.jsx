import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState('add');

  const onOpenWaterModal = type => {
    setOperationType(type);
    setShowWaterModal(true);
  };

  const onCloseWaterModal = () => {
    setShowWaterModal(false);
  };

  return (
    <div>
      <button
        className={css.addWaterBtn}
        onClick={() => onOpenWaterModal('edit')}
      >
        <svg
          className={css.addWaterIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.33337V12.6667"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.3335 8H12.6668"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add water
      </button>
      {showWaterModal && (
        <WaterModal
          waterModalOpen={showWaterModal}
          closeWaterModal={onCloseWaterModal}
          operationType={operationType}
        />
      )}
    </div>
  );
};

export default AddWaterBtn;
