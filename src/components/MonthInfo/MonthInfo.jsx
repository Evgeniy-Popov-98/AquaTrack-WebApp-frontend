import Calendar from '../Calendar/Calendar.jsx';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import s from './MonthInfo.module.css';
import { getDaysInMonth, getMonthName } from '../../const/const.js';
import { useState } from 'react';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = offset => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  const monthName = getMonthName(currentDate.getMonth());
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentDate.getMonth(), year);

  return (
    <section className={`s.MonthInfo container`}>
      <div className={s.wrapTittle}>
        <h3>Month</h3>
        <CalendarPagination
          currentDate={`${monthName}, ${year}`}
          handleMonthChange={handleMonthChange}
        />
      </div>
      <Calendar daysInMonth={daysInMonth} />
    </section>
  );
};

export default MonthInfo;