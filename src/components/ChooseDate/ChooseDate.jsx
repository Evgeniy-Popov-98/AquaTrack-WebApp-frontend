import css from './ChooseDate.module.css';

const ChooseDate = () => {
  const today = new Date().getDate();
  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const formattedDate = `${today}, ${month}`;

  return (
    <div>
      <h2 className={css.title}>{formattedDate}</h2>
    </div>
  );
};

export default ChooseDate;
