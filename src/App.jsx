import { Route, Routes } from 'react-router-dom';
import './App.css';
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import HomePage from './page/HomePage/HomePage.jsx';
import SignUpPage from './page/SignUpPage/SignUpPage.jsx';
import SignInPage from './page/SignInPage/SignInPage.jsx';

function App() {
  return (
    <>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </SharedLayout>
    </>
  );
}

export default App;
