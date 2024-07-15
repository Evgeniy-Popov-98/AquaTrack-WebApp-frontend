import { useState } from 'react';

import CalendarItem from '../CalendarItem/CalendarItem.jsx';
import s from './Calendar.module.css';

const Calendar = ({ daysInMonth }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const days = Array.from({ length: daysInMonth }, (v, k) => k + 1);

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
