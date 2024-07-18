import { useSelector } from 'react-redux';
import css from './WaterList.module.css';
import { selectWaterDaily } from '../../redux/water/selectors';
import sprite from '../../assets/icons/icons.svg';

const WaterList = () => {
  const waterDaily = useSelector(selectWaterDaily);

  return (
    <div className={css.waterList}>
      {waterDaily.map(item => (
        <div key={item.id} className={css.waterCard}>
          <svg
          //   className={clsx(css.staticPositionIcon, {
          //     [css.activeRotateIcon]: userBarPopover,
          //   })}
          >
            <use href={`${sprite}#icon-water-glass`} />
          </svg>
          <p>{item.amountLiters} ml</p>
          <p>{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default WaterList;
