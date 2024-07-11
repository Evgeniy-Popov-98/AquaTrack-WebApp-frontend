import './App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import SharedLayout from './SharedLayout';


const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignIn = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUp = lazy(() => import('./page/SignUpPage/SignUpPage'));
const Tracker = lazy(() => import('./page/TrackerPage/TrackerPage'));
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/tracker"
          element={<Tracker /> }
        />
      </Route>
    </Routes>
  );
}

export default App;
