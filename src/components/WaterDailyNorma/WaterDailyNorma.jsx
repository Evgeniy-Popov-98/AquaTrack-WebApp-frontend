import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors';

const WaterDailyNorma = () => {
  const dayliWater = useSelector(selectUser);

  return (
    <div className={css.waterDailyNormaContainer}>
      <div className={css.textContainer}>
        <p className={css.liter}>{dayliWater.dailyWaterIntake} L</p>
        <p className={css.literDesctiption}>My daily norma</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
