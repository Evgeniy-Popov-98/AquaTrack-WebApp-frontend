import { useSelector } from 'react-redux';
import { selectWaterDaily } from '../../redux/water/selectors';

import WaterItem from '../WaterItem/WaterItem';

import css from './WaterList.module.css';

const WaterList = () => {
  const waterDaily = useSelector(selectWaterDaily);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {waterDaily.map(item => (
          <li className={css.waterCard} key={item.id}>
            <WaterItem
              amountLiters={item.amountLiters}
              time={item.time}
              waterId={item.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterList;
