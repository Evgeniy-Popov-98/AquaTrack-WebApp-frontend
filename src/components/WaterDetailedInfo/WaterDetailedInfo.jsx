// import DailyInfo from '../DailyInfo/DailyInfo';
// import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';

import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <div className={css.trackContainerItem}>
      <UserPanel />
      {/* <DailyInfo /> */}
      {/* <MonthInfo /> */}
    </div>
  );
};

export default WaterDetailedInfo;
