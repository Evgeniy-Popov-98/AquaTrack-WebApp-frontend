import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  return (
    <div className={css.container} onClick={() => {}}>
      <button className={css.btn}>
        <svg width={30} height={30}>
          <use href="/src/assets/icons/icons.svg#icon-plus" />
        </svg>
      </button>
      <span className={css.text}>Add water</span>
    </div>
  );
};

export default AddWaterBtn;
