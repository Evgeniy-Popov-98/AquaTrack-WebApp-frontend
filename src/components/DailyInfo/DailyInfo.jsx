import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';

import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <section>
      <div className={css.container}>
        <ChooseDate />
        <AddWaterBtn />
        <WaterList />
      </div>
    </section>
  );
};

export default DailyInfo;
