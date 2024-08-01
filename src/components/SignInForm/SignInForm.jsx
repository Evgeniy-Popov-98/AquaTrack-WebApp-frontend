import Logo from '../Logo/Logo.jsx';
import { useForm } from 'react-hook-form';
import css from './SignInForm.module.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import icons from '../../assets/icons/icons.svg';
import { useDispatch } from 'react-redux';
import { getAuthUrl, login } from '../../redux/auth/operations.js';
import { toast, Toaster } from 'react-hot-toast';
import clsx from 'clsx';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async data => {
    try {
      await dispatch(login(data)).unwrap();
    } catch (err) {
      toast.error(`Login failed: ${err}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleOAuth = async () => {
    try {
      const resultAction = await dispatch(getAuthUrl());
      if (getAuthUrl.fulfilled.match(resultAction)) {
        const url = resultAction.payload;
        window.location.replace(url);
      }
    } catch (err) {
      toast.error(`Error handling Google OAuth: ${err}`);
    }
  };

  const handleChange = field => {
    return e => {
      setValue(field, e.target.value);
      if (errors[field]) {
        clearErrors(field);
      }
    };
  };

  return (
    <div className={css.formContainer}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
          error: { duration: 3500 },
        }}
      />
      <Logo styleBtn={true} />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.formTitle}>Sign In</h2>
        <div className={css.labelWrap}>
          <label className={css.formLabel}>
            Email
            <input
              className={clsx(css.formInput, {
                [css.errorInput]: errors.email,
              })}
              {...registerInput('email')}
              onChange={handleChange('email')}
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
                className={clsx(css.formInput, {
                  [css.errorInput]: errors.password,
                })}
                {...registerInput('password')}
                onChange={handleChange('password')}
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
      </form>
      {/* <button className={css.googleBtn} onClick={handleGoogleOAuth}>
        Continue with{' '}
        <svg width="20" height="20">
          <use href={`${icons}#icon-google`} />
        </svg>
      </button> */}
      <p className={css.formLink}>
        Don&apos;t have an account?&nbsp;
        <Link className={css.linkSignUp} to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
