import Logo from '../Logo/Logo.jsx';
import { useForm } from 'react-hook-form';
import css from './SignInForm.module.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import icons from '../../assets/icons/icons.svg';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations.js';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log('Form values:', data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.formContainer}>
      <Logo />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.formTitle}>Sign In</h2>
        <div className={css.labelWrap}>
          <label className={css.formLabel}>
            Email
            <input
              type="email"
              className={css.formInput}
              {...registerInput('email')}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </label>
          <label className={css.formLabel}>
            Password
            <div className={css.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={css.formInput}
                {...registerInput('password')}
                placeholder="Enter your password"
              />
              <span className={css.icon} onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg width="20" height="20">
                    <use href={`${icons}#icon-eye`} />
                  </svg>
                ) : (
                  <svg width="20" height="20">
                    <use href={`${icons}#icon-eye-off`} />
                  </svg>
                )}
              </span>
            </div>
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
