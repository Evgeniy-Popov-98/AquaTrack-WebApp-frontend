import { useDispatch, useSelector } from 'react-redux';
import css from './WaterList.module.css';
import { selectWaterItemsOfDay } from '../../redux/water/selectors';
import WaterItem from '../WaterItem/WaterItem';
import { useEffect } from 'react';
import { getWaterDaily } from '../../redux/water/operations';

const WaterList = ({ date }) => {
  const dispatch = useDispatch();
  const waterDailyItems = useSelector(selectWaterItemsOfDay);

  useEffect(() => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  }, [dispatch, date]);

  return (
    <div className={css.waterListContainer}>
      <ul className={css.waterList}>
        {Array.isArray(waterDailyItems.data) &&
          waterDailyItems.data.map(item => (
            <li key={item._id} className={css.waterCard}>
              <WaterItem item={item} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WaterList;
