// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RestrictedRoute from './routs/RestrictedRoute';
import { PrivateRoute } from './routs/PrivateRoute';
import { useAuth } from './hooks/useAuth.js';
import { selectToken } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';

import Loader from './components/Loader/Loader.jsx';
import SharedLayout from './SharedLayout';

// import { selectIsRefreshing } from './redux/auth/selectors.js';

import './App.css';
import GoogleAuthCallback from './helpers/googleAuthCallback.js';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));
const NotFound = lazy(() => import('./page/NotFound/NotFound'));

function App() {
  const dispatch = useDispatch();
  // const { isRefreshing } = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  const { isCurrent } = useAuth();

  const token = useSelector(selectToken);

  useEffect(() => {
    console.log('Token:', token);
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

   return isCurrent ? (
     <Loader />
   ) : (
     // <Suspense fallback={<Loader />}>
     <Routes>
       <Route path="/confirm-google-auth" component={GoogleAuthCallback} />
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
             <RestrictedRoute
               redirectTo="/tracker"
               component={<SignInPage />}
             />
           }
         />
         <Route
           path="/signup"
           element={
             <RestrictedRoute
               redirectTo="/tracker"
               component={<SignUpPage />}
             />
           }
         />
         <Route
           path="/tracker"
           element={
             //  <TrackerPage />
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
