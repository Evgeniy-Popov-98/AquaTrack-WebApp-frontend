import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../redux/auth/selectors';

import { getUser } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/water/selectors';

import Loader from '../../components/Loader/Loader';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <section>
      <div className={css.trackContainer}>
        <Loader loading={loading} />
        <Helmet>
          <title>AQUATRACK</title>
        </Helmet>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </section>
  );
};

export default TrackerPage;
