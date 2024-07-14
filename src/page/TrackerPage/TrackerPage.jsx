import { Helmet } from 'react-helmet-async';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <>
      <div className={css.trackContainer}>
        <Helmet>
          <title>Tracker</title>
        </Helmet>
        <WaterMainInfo />
        {/* <WaterDetailedInfo /> */}
      </div>
    </>
  );
};

export default TrackerPage;
