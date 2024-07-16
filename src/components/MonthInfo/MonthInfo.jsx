import Calendar from '../Calendar/Calendar.jsx';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import s from './MonthInfo.module.css';
import { useState } from 'react';
import { useDateFC } from '../../helpers/utils.js';

const MonthInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { monthName, year, daysInMonth } = useDateFC();

  return (
    <>
      {/* <section className={`s.MonthInfo container`}> */}
      <div className={s.wrapTittle}>
        <h3>Month</h3>
        <CalendarPagination
          currentDate={`${monthName}, ${year}`}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <Calendar
        daysInMonth={daysInMonth}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {/* </section> */}
    </>
  );
};

export default MonthInfo;
