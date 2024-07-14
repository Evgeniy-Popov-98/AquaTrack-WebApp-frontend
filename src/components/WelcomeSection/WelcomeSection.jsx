import { Link } from 'react-router-dom';
import css from './WelcomeSection.module.css';
import Logo from '../Logo/Logo.jsx';
import UserPanel from '../UserPanel/UserPanel.jsx';

const WelcomeSection = () => {
  return (
    <>
    <UserPanel />
    <div className={css.welcomeContainer}>
      <Logo />
      <h2 className={css.subtitle}>Record daily water intake and track</h2>
      <h1 className={css.title}>Water consumption tracker</h1>
      <Link className={css.linkSignUp} to="/signup">
        Try tracker
      </Link>
      <Link className={css.linkSignIn} to="/signin">
        Sign in
      </Link>
    </div>
    </>
  );
};

export default WelcomeSection;
