import s from './ChooseDate.module.css';
import { useDateFC } from '../../helpers/utils.js';

const ChooseDate = () => {
  const { numberOfMonth, monthName, currentDate } = useDateFC();
  const today = new Date().toISOString().slice(0, 10);

  console.log('today: ', today);
  console.log('currentDate: ', currentDate);

  return (
    <div className={s.ChooseDate}>
      {currentDate.includes(today) ? 'Today' : `${numberOfMonth}, ${monthName}`}
    </div>
  );
};

export default ChooseDate;
