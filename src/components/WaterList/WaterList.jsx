import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWaterDaily } from '../../redux/water/selectors';

import WaterModal from '../WaterModal/WaterModal';

import css from './WaterList.module.css';
import sprite from '../../assets/icons/icons.svg';

const WaterList = () => {
  const waterDaily = useSelector(selectWaterDaily);

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
    <ul className={css.waterList}>
      {waterDaily.map(item => (
        <li className={css.waterCard} key={item.id}>
          <svg className={css.bottleIcon}>
            <use href={`${sprite}#icon-water-glass`} />
          </svg>
          <div className={css.containerText}>
            <p style={{ fontWeight: 700, fontSize: '15px' }}>
              {item.amountLiters} ml
            </p>
            <p>{item.time}</p>
          </div>
          <div className={css.containerIcon}>
            <button
              className={css.button}
              onClick={() => onOpenWaterModal('edit')}
              type="button"
            >
              <svg className={css.setingsIcon}>
                <use href={`${sprite}#icon-edit-2`} />
              </svg>
            </button>
            <button
              className={css.button}
              onClick={() => onOpenWaterModal('delete')}
              type="button"
            >
              <svg className={css.setingsIcon}>
                <use href={`${sprite}#icon-trash-04`} />
              </svg>
            </button>
          </div>
        </li>
      ))}
      {showWaterModal && (
        <WaterModal
          waterModalOpen={showWaterModal}
          closeWaterModal={onCloseWaterModal}
          operationType={operationType}
        />
      )}
    </ul>
  );
};

export default WaterList;
