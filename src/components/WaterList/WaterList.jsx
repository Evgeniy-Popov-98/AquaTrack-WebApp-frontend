import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectWaterItemsOfDay } from '../../redux/water/selectors';
import { getWaterDaily } from '../../redux/water/operations';

import WaterItem from '../WaterItem/WaterItem';

import css from './WaterList.module.css';

const WaterList = ({ date }) => {
  const dispatch = useDispatch();
  const waterDailyItems = useSelector(selectWaterItemsOfDay);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  }, [dispatch, date]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const itemCount = Array.isArray(waterDailyItems.data) ? waterDailyItems.data.length : 0;

      if (screenWidth >= 768) {
        setIsScrollable(itemCount >= 4);
      } else {
        setIsScrollable(itemCount >= 3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [waterDailyItems]);

  const refreshData = () => {
    if (date) {
      dispatch(getWaterDaily(date));
    }
  };

  return (
    <div className={`${css.container} ${isScrollable ? css.scrollable : ''}`}>
      <ul className={css.list}>
        {Array.isArray(waterDailyItems.data) && waterDailyItems.data.length > 0 ? (
          waterDailyItems.data.map(item => (
            <li key={item._id} className={css.item}>
              <WaterItem item={item} refreshData={refreshData} />
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
};

export default WaterList;
