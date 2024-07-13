import SignInForm from '../../components/SignInForm/SignInForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import css from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <div className={css.signInContainer}>
      <SignInForm />
      <div className={css.advSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
