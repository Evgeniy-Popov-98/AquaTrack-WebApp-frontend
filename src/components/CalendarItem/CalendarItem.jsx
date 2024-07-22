import { useDispatch, useSelector } from 'react-redux';
import s from './CalendarItem.module.css';
import { setDate } from '../../redux/calendar/slice.js';
import { useDateFC } from '../../helpers/utils.js';
import { useRef } from 'react';
import { selectWaterItemsOfMonthly } from '../../redux/water/selectors.js';

const CalendarItem = ({ day, idx, activeIndex, setActiveIndex }) => {
  const { year, month } = useDateFC();
  const dispatch = useDispatch();
  const btn = useRef();
  const waterMonthly = useSelector(selectWaterItemsOfMonthly);

  const isClicked = activeIndex === idx;
  // const date = idx + 1;
  const formattedMonth = month < 10 ? `0${month + 1}` : month + 1;
  const formattedDay = day < 10 ? `0${day}` : day;
  const dateMonth = `${year}-${formattedMonth}-${formattedDay}`;

  const procentages = waterMonthly.reduce((acc, item) => {
    acc[item.date] = (item.consumptionPercentage / 1000).toFixed(0);
    return acc;
  }, {});

  const styleNorma = procentages[dateMonth] >= 100 ? s.btn : s.normaInComplete;

  let styleClick = isClicked ? s.btnClicked : styleNorma;

  const handleClick = () => {
    setActiveIndex(idx);
    dispatch(setDate({ year, month, date: formattedDay + 1 }));
  };

  return (
    <div className={s.CalendarItem}>
      <button
        ref={btn}
        className={styleClick}
        type="button"
        onClick={handleClick}
      >
        <span>{day}</span>
      </button>
      <span>{procentages[dateMonth] || 0}%</span>
    </div>
  );
};

export default CalendarItem;
