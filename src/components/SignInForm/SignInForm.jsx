import Logo from '../Logo/Logo.jsx';
import { useForm } from 'react-hook-form';
import css from './SignInForm.module.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = d => {
    alert(JSON.stringify(d));
  };

  return (
    <div className={css.formContainer}>
      <Logo />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.formTitle}>Sign In</h2>
        <div className={css.inputWrap}>
          <label className={css.formLabel}>
            Email
            <input
              className={css.formInput}
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </label>
          <label className={css.formLabel}>
            Password
            <input
              className={css.formInput}
              {...register('password')}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </label>
        </div>
        <button className={css.formBtn} type="submit">
          Sign In
        </button>
        <p className={css.formLink}>
          Don&apos;t have an account?&nbsp;
          <Link className={css.linkSignUp} to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
