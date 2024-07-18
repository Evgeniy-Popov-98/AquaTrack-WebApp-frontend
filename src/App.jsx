// import { useState } from 'react';
// import LogOutModal from './components/LogOutModal/LogOutModal.jsx';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import SharedLayout from './SharedLayout';
import './App.css';
// import NotFound from './page/NotFound/NotFound.jsx';
import Loader from './components/Loader/Loader.jsx';
import RestrictedRoute from './routs/RestrictedRoute';
import { PrivateRoute } from './routs/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { useAuth } from './hooks/useAuth.js';
import { selectToken } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
// import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.jsx';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));
const NotFound = lazy(() => import('./page/NotFound/NotFound'));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  const { isCurrent } = useAuth();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return isCurrent ? (
    <Loader />
  ) : (
    // <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <RestrictedRoute redirectTo="/tracker" component={<HomePage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />
          }
        />
        <Route
          path="/tracker"
          element={
            // <TrackerPage />
            <PrivateRoute redirectTo="/" component={<TrackerPage />} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // </Suspense>
  );
}

export default App;
