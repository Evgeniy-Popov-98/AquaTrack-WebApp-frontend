import css from './WaterItem.module.css';

const WaterItem = () => {
  return (
    <li className={css.item}>
      <div className={css.container}>
        <div className={css.icon}>
          <svg width={38} height={38}>
            <use href="/src/assets/icons/icons.svg#icon-water-glass" />
          </svg>
        </div>
        <div className={css.info}>
          <p className={css.volume}>250 ml</p>
          <p className={css.time}>7:00 am</p>
        </div>
        <div className={css.icons}>
          <button className={css.btn} onClick={() => {}}>
            <svg width={14} height={14} stroke="#323f47" fill="white">
              <use href="/src/assets/icons/icons.svg#icon-edit-2" />
            </svg>
          </button>
          <button className={css.btn} onClick={() => {}}>
            <svg width={14} height={14} stroke="#323f47" fill="white">
              <use href="/src/assets/icons/icons.svg#icon-trash-04" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default WaterItem;
