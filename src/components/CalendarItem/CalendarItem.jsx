import s from './CalendarItem.module.css';

const CalendarItem = ({ day, idx, activeIndex, setActiveIndex }) => {
  const isClicked = activeIndex === idx;
  const procentage = 10;
  const styleNorma = procentage >= 100 ? s.btn : s.normaInComplete;

  const styleClick = isClicked ? s.btnClicked : styleNorma;

  const handleClick = () => {
    setActiveIndex(idx);
  };

  return (
    <div className={s.CalendarItem}>
      <button className={styleClick} type="button" onClick={handleClick}>
        <span>{day}</span>
      </button>
      <span>{procentage}%</span>
    </div>
  );
};

export default CalendarItem;
