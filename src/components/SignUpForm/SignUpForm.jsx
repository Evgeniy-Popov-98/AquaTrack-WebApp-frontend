import Logo from '../Logo/Logo.jsx';
import { useForm } from 'react-hook-form';
import css from './SignUpForm.module.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import icons from '../../assets/icons/icons.svg';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (value, action) => {
    console.log('Form values:', value);
    dispatch(register(value));
    action.resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.formContainer}>
      <Logo />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.formTitle}>Sign Up</h2>
        <div className={css.labelWrap}>
          <label className={css.formLabel}>
            Email
            <input
              type="email"
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
            <div className={css.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={css.formInput}
                {...register('password')}
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
          <label className={css.formLabel}>
            Repear password
            <div className={css.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={css.formInput}
                {...register('repeatPassword')}
                placeholder="Repeat your password"
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
            {errors.repeatPassword && (
              <p className={css.error}>{errors.repeatPassword.message}</p>
            )}
          </label>
        </div>
        <button className={css.formBtn} type="submit">
          Sign Up
        </button>
        <p className={css.formLink}>
          Already have account?&nbsp;
          <Link className={css.linkSignIn} to="/signin">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
