import { useDispatch, useSelector } from 'react-redux';
import css from './WaterList.module.css';
import { selectWaterItemsOfDay } from '../../redux/water/selectors';
import WaterItem from '../WaterItem/WaterItem';
import { useEffect, useState } from 'react';
import { getWaterDaily } from '../../redux/water/operations';

const WaterList = ({ date }) => {
  const dispatch = useDispatch();
  const waterDailyItems = useSelector(selectWaterItemsOfDay);
  const [localWaterItems, setLocalWaterItems] = useState(waterDailyItems);

  useEffect(() => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  }, [dispatch, date]);

  useEffect(() => {
    setLocalWaterItems(waterDailyItems);
  }, [waterDailyItems]);

  return (
    <div className={css.waterListContainer}>
      <ul className={css.waterList}>
        {Array.isArray(localWaterItems) && localWaterItems.length > 0 ? (
          localWaterItems.map(item => (
            <li key={item._id} className={css.waterCard}>
              <WaterItem item={item} />
            </li>
          ))
        ) : (
          <p>No water records available</p>
        )}
      </ul>
    </div>
  );
};

export default WaterList;
