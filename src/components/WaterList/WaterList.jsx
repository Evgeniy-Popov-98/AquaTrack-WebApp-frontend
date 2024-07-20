import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectWaterItemsOfDay } from '../../redux/water/selectors';
// import { selectWaterDaily } from '../../redux/water/selectors';
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

  //   return (
  //     <div className={css.waterListContainer}>
  //       <ul className={css.waterList}>
  //         {Array.isArray(waterDailyItems.data) &&
  //           waterDailyItems.data.map(item => (
  //             <li key={item._id} className={css.waterCard}>
  //               <WaterItem item={item} />
  //             </li>
  //           ))}
  // const WaterList = () => {
  //   const waterDaily = useSelector(selectWaterDaily);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {waterDailyItems.map(item => (
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
