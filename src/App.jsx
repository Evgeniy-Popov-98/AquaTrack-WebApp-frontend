import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout';
import './App.css';
// import NotFound from './page/NotFound/NotFound.jsx';
import Loader from './components/Loader/Loader.jsx';
import RestrictedRoute from './routs/RestrictedRoute';
import { PrivateRoute } from './routs/PrivateRoute';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));
const NotFound = lazy(() => import('./page/NotFound/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<RestrictedRoute redirectTo="/tracker" component={<HomePage />} />} />
          <Route path="/signin" element={<RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />} />
          <Route path="/signup" element={<RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />} />
          <Route path="/tracker" element={<PrivateRoute redirectTo="/" component={<TrackerPage />} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
