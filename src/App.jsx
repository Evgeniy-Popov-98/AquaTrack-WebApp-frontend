import { useState } from 'react';
import LogOutModal from './components/LogOutModal/LogOutModal.jsx';
import { Routes, Route } from 'react-router-dom';
import TrackerPage from './page/TrackerPage/TrackerPage';
import './App.css';

function App() {
  const [logOutModalIsOpen, setLogOutModalIsOpen] = useState(false);

  function openLogOutModal() {
    setLogOutModalIsOpen(true);
  }

  function closeLogOutModal() {
    setLogOutModalIsOpen(false);
  }

  return (
    <>
    <button onClick={()=>openLogOutModal()}>LogOut</button>
    <LogOutModal 
    logOutModalIsOpen={logOutModalIsOpen} 
        closeLogOutModal={closeLogOutModal} />
      

      <Routes>
        <Route path="/" element="Home Page" />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="*" element="Not found" />
      </Routes>
    </>
    
  )
}

export default App;
