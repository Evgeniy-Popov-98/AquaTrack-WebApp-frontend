import { useDispatch } from 'react-redux';
import s from './CalendarItem.module.css';
import { setDate } from '../../redux/calendar/slice.js';
import { useDateFC } from '../../helpers/utils.js';
import { useRef } from 'react';

const CalendarItem = ({ day, idx, activeIndex, setActiveIndex }) => {
  const { year, month } = useDateFC();

  const isClicked = activeIndex === idx;

  const dispatch = useDispatch();
  const btn = useRef();

  const date = idx + 1;
  const procentage = 100;
  const styleNorma = procentage >= 100 ? s.btn : s.normaInComplete;

  let styleClick = isClicked ? s.btnClicked : styleNorma;

  const handleClick = () => {
    setActiveIndex(idx);
    dispatch(setDate({ year, month, date }));
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
      <span>{procentage}%</span>
    </div>
  );
};

export default CalendarItem;
