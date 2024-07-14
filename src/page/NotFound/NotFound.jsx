import { Link, Navigate } from 'react-router-dom';
import css from './NotFound.module.css';
import Logo from '../../components/Logo/Logo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimer } from '../../redux/timer/selectors.js';
import { useEffect } from 'react';
import { incrementTimer } from '../../redux/timer/slice.js';

const NotFound = () => {
  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(incrementTimer());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (timer === 10) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className={css.container}>
      <Logo />
      <h2 className={css.title}>Page you visited doesn&apos;t exist</h2>
      <Link className={css.link} to="/">
        Come back Home
      </Link>
      <h3 className={css.timer}>
        You will be redirected to <span>Home</span> in <span>{10 - timer}</span>{' '}
        seconds
      </h3>
    </div>
  );
};

export default NotFound;
