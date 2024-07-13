import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import SharedLayout from './SharedLayout';

import './App.css';

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
