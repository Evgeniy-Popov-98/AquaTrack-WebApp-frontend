import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        <WaterItem />
        <WaterItem />
        <WaterItem />
        <WaterItem />
        <WaterItem />
      </ul>
    </div>
  );
};

export default WaterList;
