import './App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy} from 'react';
import SharedLayout from './SharedLayout';

const Tracker = lazy(() => import('./page/Tracker/Tracker'));
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          path="/tracker"
          element={<Tracker />}
        />
      </Route>
    </Routes>
  );
}

export default App;
