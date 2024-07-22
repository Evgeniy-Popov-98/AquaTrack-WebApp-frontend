import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectWaterItemsOfDay } from '../../redux/water/selectors';
import { getWaterDaily } from '../../redux/water/operations';

import WaterItem from '../WaterItem/WaterItem';

import css from './WaterList.module.css';

const WaterList = ({ date }) => {
  const dispatch = useDispatch();
  const waterDailyItems = useSelector(selectWaterItemsOfDay);

  useEffect(() => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  }, [dispatch, date]);

  const refreshData = () => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {Array.isArray(waterDailyItems.data) &&
          waterDailyItems.data.map(item => (
            <li key={item._id} className={css.item}>
              <WaterItem item={item} refreshData={refreshData} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WaterList;
