import css from './AddWaterBtn2.module.css';

const AddWaterBtn2 = () => {
  return (
    <div>
      <button className={css.addWaterBtn2} type="button">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="15" className={css.addWaterIconBackground} />
          <path
            d="M15 9.64282V20.3571"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.addWaterIconPath}
          />
          <path
            d="M9.64307 15H20.3574"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.addWaterIconPath}
          />
        </svg>
        Add water
      </button>
    </div>
  );
};

export default AddWaterBtn2;
