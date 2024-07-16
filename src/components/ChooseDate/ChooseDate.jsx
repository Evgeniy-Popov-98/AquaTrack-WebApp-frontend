import s from './ChooseDate.module.css';
import { useDateFC } from '../../helpers/utils.js';

const ChooseDate = () => {
  const { numberOfMonth, monthName, currentDate } = useDateFC();
  const today = new Date().toLocaleDateString(navigator.language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className={s.ChooseDate}>
      {currentDate === today ? 'Today' : `${numberOfMonth}, ${monthName}`}
    </div>
  );
};

export default ChooseDate;
