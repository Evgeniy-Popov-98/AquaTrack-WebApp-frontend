import './App.css';
import { Routes, Route } from 'react-router-dom';
import TrackerPage from './page/TrackerPage/TrackerPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="*" element="Not found" />
      </Routes>
    </>
  );
}

export default App;
