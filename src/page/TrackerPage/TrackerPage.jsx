import { Helmet } from 'react-helmet-async';

import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <section>
      <div className={css.trackContainer}>
        <Helmet>
          <title>Tracker</title>
        </Helmet>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </section>
  );
};

export default TrackerPage;
