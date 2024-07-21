import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  //   const dayliWater = useSelector();

  return (
    <div className={css.waterDailyNormaContainer}>
      <div className={css.textContainer}>
        <p className={css.liter}>1.5 L</p>
        <p className={css.literDesctiption}>My daily norma</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
