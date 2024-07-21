import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors.js';

const WaterDailyNorma = () => {
  const { dailyWaterIntake } = useSelector(selectUser);
  return (
    <div className={css.waterDailyNormaContainer}>
      <div className={css.textContainer}>
        <p className={css.liter}>{`${dailyWaterIntake} L`}</p>
        <p className={css.literDesctiption}>My daily norma</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
