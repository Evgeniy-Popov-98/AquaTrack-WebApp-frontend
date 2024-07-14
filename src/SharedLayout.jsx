import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

const SharedLayout = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
