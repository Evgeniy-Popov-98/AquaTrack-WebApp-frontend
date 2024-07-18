import { Helmet } from 'react-helmet-async';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/auth/selectors';
import { selectLoading } from '../../redux/water/selectors';
import Loader from '../../components/Loader/Loader';
import css from './TrackerPage.module.css';

const TrackerPage = () => {
  const loading = useSelector(selectIsLoading);
  const loadingWater = useSelector(selectLoading);

  return (
    <>
      {loading && <Loader />}
      {loadingWater && <Loader />}
      <div className={css.trackContainer}>
        <Helmet>
          <title>Tracker</title>
        </Helmet>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
};

export default TrackerPage;
