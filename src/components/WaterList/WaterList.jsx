import { useSelector } from 'react-redux';
import css from './WaterList.module.css';

const WaterList = () => {
  const waterDaily = useSelector(state => state.water.waterDaily);

  return (
    <div className={css.waterList}>
      {waterDaily.map(item => (
        <div key={item.id} className={css.waterCard}>
          <p>{item.amountLiters} ml</p>
          <p>{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default WaterList;