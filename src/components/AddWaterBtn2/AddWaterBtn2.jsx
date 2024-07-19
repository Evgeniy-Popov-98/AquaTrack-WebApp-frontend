import css from './AddWaterBtn2.module.css';
import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
//import icons from '../../assets/icons/icons.svg';

const AddWaterBtn2 = () => {
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
      <button className={css.addWaterBtn2} onClick={() => onOpenWaterModal('add')}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
           <rect width="30" height="30" rx="15" fill="#9BE1A0" />
          <path
            d="M15 9.64282V20.3571"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.addWaterIconPath}
          />
          <path
            d="M9.64307 15H20.3574"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.addWaterIconPath}
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

export default AddWaterBtn2;
  {/* <svg className={css.addWaterIcon2} width="15" height="15">
          <use href={`${icons}#icon-plus`} />
        </svg> */}