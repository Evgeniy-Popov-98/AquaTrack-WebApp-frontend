import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RestrictedRoute from './routs/RestrictedRoute';
import { PrivateRoute } from './routs/PrivateRoute';
import useTokenRefresh from './hooks/useTokenRefresh.js';

import Loader from './components/Loader/Loader.jsx';
import SharedLayout from './SharedLayout';

import './App.css';
import GoogleAuthCallback from './helpers/googleAuthCallback.js';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));
const NotFound = lazy(() => import('./page/NotFound/NotFound'));

function App() {
  useTokenRefresh(); // Виклик хуку рефрешу токенів

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/confirm-google-auth" element={<GoogleAuthCallback />} />
          <Route index element={<HomePage />} />
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
              <PrivateRoute redirectTo="/" component={<TrackerPage />} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
