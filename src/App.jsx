import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import SharedLayout from './SharedLayout';

import './App.css';
import UserSettingsForm from './components/UserSettingsForm/UserSettingsForm';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
      </Route>
    </Routes>
  );
}

export default App;
