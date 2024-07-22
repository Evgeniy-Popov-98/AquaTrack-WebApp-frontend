import s from './ChooseDate.module.css';
import { useDateFC } from '../../helpers/utils.js';
import { useSelector } from 'react-redux';
import { selectCalendar } from '../../redux/calendar/selector.js';

const ChooseDate = () => {
  const { numberOfMonth, monthName } = useDateFC();
  const today = new Date().toISOString().split('T')[0];

  // Отримуємо обрану дату
  const currentActiveDay = useSelector(selectCalendar).split('T')[0];

  return (
    <div className={s.ChooseDate}>
      {currentActiveDay === today
        ? 'Today'
        : `${numberOfMonth - 1}, ${monthName}`}
    </div>
  );
};

export default ChooseDate;
