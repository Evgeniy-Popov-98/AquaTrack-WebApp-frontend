import Calendar from '../Calendar/Calendar.jsx';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import s from './MonthInfo.module.css';
import { getDaysInMonth, getMonthName } from '../../const/const.js';
import { useSelector } from 'react-redux';
import { selectCalendar } from '../../redux/calendar/selector.js';

const MonthInfo = () => {
  const currentDate = useSelector(selectCalendar);
  const monthName = getMonthName(new Date(currentDate).getMonth());
  const year = new Date(currentDate).getFullYear();
  const daysInMonth = getDaysInMonth(new Date(currentDate).getMonth(), year);

  return (
    <section className={`s.MonthInfo container`}>
      <div className={s.wrapTittle}>
        <h3>Month</h3>
        <CalendarPagination currentDate={`${monthName}, ${year}`} />
      </div>
      <Calendar daysInMonth={daysInMonth} />
    </section>
  );
};

export default MonthInfo;
