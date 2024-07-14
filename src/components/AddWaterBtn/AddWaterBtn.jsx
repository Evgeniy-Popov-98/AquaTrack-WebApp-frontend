import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  return (
    <div >
      <button className={css.addWaterBtn} type="button">
          <svg
          className={css.addWaterIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.33337V12.6667"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.3335 8H12.6668"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add water
      </button>
    </div>
  );
};

export default AddWaterBtn;
