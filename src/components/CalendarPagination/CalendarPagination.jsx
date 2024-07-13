import s from './CalendarPagination.module.css';
import iconChevronLeft from '../../assets/icons/icons.svg#icon-chevron-left';
import iconChevronRight from '../../assets/icons/icons.svg#icon-chevron-right';

const CalendarPagination = ({ currentDate, handleMonthChange }) => {
  return (
    <div className={s.CalendarPagination}>
      <button className={s.btn} onClick={() => handleMonthChange(-1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={iconChevronLeft}></use>
        </svg>
      </button>
      <p>{currentDate}</p>
      <button className={s.btn} onClick={() => handleMonthChange(1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={iconChevronRight}></use>
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
