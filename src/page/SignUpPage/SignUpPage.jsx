import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={css.signUpContainer}>
      <SignUpForm />
      <div className={css.advSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
