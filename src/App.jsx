import { useState } from 'react';

import LogOutModal from './components/LogOutModal/LogOutModal.jsx';

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
    </>
    
  )
}

export default App;
