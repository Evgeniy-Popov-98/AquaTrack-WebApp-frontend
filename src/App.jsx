import { useState } from 'react';
import LogOutModal from './components/LogOutModal/LogOutModal.jsx';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout';
import './App.css';
import NotFound from './page/NotFound/NotFound.jsx';
import Loader from './components/Loader/Loader.jsx';
import UserSettingsForm from './components/UserSettingsForm/UserSettingsForm.jsx';
function App() {
  return (
    // <button onClick={()=>openLogOutModal()}>LogOut</button>
    //   <LogOutModal
    //   logOutModalIsOpen={logOutModalIsOpen}
    //       closeLogOutModal={closeLogOutModal} />

    <UserSettingsForm />

    // <Suspense fallback={<Loader />}>
    //   <Routes>
    //     <Route path="/" element={<SharedLayout />}>
    //       <Route index element={<HomePage />} />
    //       <Route path="/signin" element={<SignInPage />} />
    //       <Route path="/signup" element={<SignUpPage />} />
    //       <Route path="/tracker" element={<TrackerPage />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Route>
    //   </Routes>
    // </Suspense>
  );
}

export default App;
