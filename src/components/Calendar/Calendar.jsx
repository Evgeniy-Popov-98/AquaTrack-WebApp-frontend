import { useEffect } from 'react';
import CalendarItem from '../CalendarItem/CalendarItem.jsx';
import s from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterDaily } from '../../redux/water/operations.js';
import { selectCalendar } from '../../redux/calendar/selector.js';

const Calendar = ({ daysInMonth, setActiveIndex, activeIndex }) => {
  const currentActiveDay = useSelector(selectCalendar).split('T')[0];

  const dispatch = useDispatch();
  const days = Array.from({ length: daysInMonth }, (v, k) => k + 1);

  useEffect(() => {
    dispatch(getWaterDaily(currentActiveDay));
  }, [dispatch, currentActiveDay]);

  return (
    <ul className={s.Calendar}>
      {days.map((day, idx) => (
        <li className={s.list} key={day}>
          <CalendarItem
            day={day}
            idx={idx}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </li>
      ))}
    </ul>
  );
};

export default Calendar;
