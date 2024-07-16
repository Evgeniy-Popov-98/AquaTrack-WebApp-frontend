import s from './CalendarPagination.module.css';
import icons from '../../assets/icons/icons.svg';
import { useDispatch } from 'react-redux';
import { changeMonth } from '../../redux/calendar/slice.js';
import { useDateFC } from '../../helpers/utils.js';

const CalendarPagination = ({ currentDate, setActiveIndex }) => {
  const { numberOfMonth } = useDateFC();
  const dispatch = useDispatch();

  const handleChangeMonth = offset => {
    dispatch(changeMonth(offset));
    setActiveIndex(numberOfMonth - 1);
  };

  return (
    <div className={s.CalendarPagination}>
      <button className={s.btn} onClick={() => handleChangeMonth(-1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={`${icons}#icon-chevronLeft`} />
        </svg>
      </button>
      <p>{currentDate}</p>
      <button className={s.btn} onClick={() => handleChangeMonth(1)}>
        <svg className={s.icon} width={18} height={18}>
          <use href={`${icons}#icon-chevron-right`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
