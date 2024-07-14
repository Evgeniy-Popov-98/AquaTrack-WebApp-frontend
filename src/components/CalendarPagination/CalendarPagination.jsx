import s from './CalendarPagination.module.css';
import icons from '../../assets/icons/icons.svg';

const CalendarPagination = ({ currentDate, handleMonthChange }) => {
  return (
    <div className={s.CalendarPagination}>
      <button className={s.btn} onClick={() => handleMonthChange(-1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={`${icons}#icon-chevron-left`} />
        </svg>
      </button>
      <p>{currentDate}</p>
      <button className={s.btn} onClick={() => handleMonthChange(1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={`${icons}#icon-chevron-right`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
