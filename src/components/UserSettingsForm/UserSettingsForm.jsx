import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';

import UserSettingsAvatar from '../UserSettingsAvatar/UserSettingsAvatar';
import sprite from '../../assets/icons/icons.svg';
import { selectUser } from '../../redux/auth/selectors';
import { updateUser } from '../../redux/auth/operations';

import {
  convertingToNumber,
  dailyWaterRecomendCalculation,
  DECIMAL_PATTERN,
} from '../../helpers/userSettingUtils';

import css from './UserSettingsForm.module.css';

const schema = yup.object().shape({
  name: yup.string().notRequired(),
  gender: yup.string().oneOf(['female', 'male']),
  email: yup.string().email().notRequired(),
  weight: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
  activeSportsTime: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
  dailyWaterIntake: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
});

const UserSettingsForm = ({ closeSettingModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: user.gender || 'female',
      name: user.name || null,
      email: user.email,
      weight: user.weight || null,
      activeSportsTime: user.activeSportsTime || null,
      dailyWaterIntake: user.dailyWaterIntake || null,
    },
  });

  const genderValue = watch('gender');
  const weightNumber = convertingToNumber(watch('weight'));
  const activeSportsTimeNumber = convertingToNumber(watch('activeSportsTime'));
  const dailyWaterIntakeNumber = convertingToNumber(watch('dailyWaterIntake'));

  const dailyWaterRecomended = dailyWaterRecomendCalculation(
    genderValue,
    weightNumber,
    activeSportsTimeNumber
  );

  const onSubmit = async data => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = data[key];
      if (!value) {
        if (key !== 'dailyWaterIntake') {
          return;
        }
      }

      switch (key) {
        case 'gender':
          formData.append(key, value);
          break;
        case 'name':
          if (value !== user.name) {
            formData.append(key, value);
          }
          break;
        case 'email':
          if (value !== user.email) {
            formData.append(key, value);
          }
          break;
        case 'weight':
          if (weightNumber !== user.weight) {
            formData.append(key, weightNumber);
          }
          break;
        case 'activeSportsTime':
          if (activeSportsTimeNumber !== user.activeSportsTime) {
            formData.append(key, activeSportsTimeNumber);
          }
          break;
        case 'dailyWaterIntake':
          if (data[key]) {
            if (dailyWaterIntakeNumber !== user.dailyWaterIntake) {
              return formData.append(key, dailyWaterIntakeNumber);
            } else {
              break;
            }
          } else {
            return formData.append(key, dailyWaterRecomended);
          }
        default:
          break;
      }
    });

    console.log(...formData);

    try {
      const result = await dispatch(updateUser(formData));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('The form has been sent successfully!');
        setTimeout(() => {
          closeSettingModal();
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
    }
  };

  const hasErrors = !!errors.weight || !!errors.activeSportsTime;

  return (
    <div className={css.settingsContainer}>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              border: '3px solid #9be1a0',
              padding: '16px',
              color: '#323f47',
            },
          },
          error: {
            style: {
              border: '3px solid red',
              padding: '16px',
              color: '#323f47',
            },
          },
        }}
      />

      <UserSettingsAvatar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={clsx(css.settingsForm, {
            [css.settingsFormError]: hasErrors,
          })}
        >
          <div className={css.settingsGender}>
            <p className={css.settingLabel}>Your gender identity</p>

            <div className={css.radioButton}>
              <label className={css.customRadio}>
                <input
                  className={css.inputRadio}
                  type="radio"
                  value="female"
                  name="gender"
                  {...register('gender')}
                />
                <svg width="18" height="18">
                  <use
                    href={`${sprite}#icon-radio-button-${
                      genderValue === 'female' ? 'checked' : 'unchecked'
                    }`}
                  ></use>
                </svg>
                Woman
              </label>

              <label className={`${css.customRadio} ${css.text}`}>
                <input
                  className={css.inputRadio}
                  type="radio"
                  value="male"
                  name="gender"
                  {...register('gender')}
                />
                <svg width="18" height="18">
                  <use
                    href={`${sprite}#icon-radio-button-${
                      genderValue === 'male' ? 'checked' : 'unchecked'
                    }`}
                  ></use>
                </svg>
                Man
              </label>
            </div>

            <p className={css.errorMessage}>{errors.gender?.message}</p>
          </div>

          <div className={css.settingsNameEmailWrap}>
            <div className={css.labelInput}>
              <label className={css.settingLabel}>Your name</label>
              <input
                {...register('name')}
                className={clsx(css.settingInput, {
                  [css.error]: errors.name,
                })}
              />
              <p className={css.errorMessage}>{errors.name?.message}</p>
            </div>

            <div className={css.labelInput}>
              <label className={css.settingLabel}>Email</label>
              <input
                {...register('email')}
                className={clsx(css.settingInput, {
                  [css.error]: errors.email,
                })}
              />
              <p className={css.errorMessage}>{errors.email?.message}</p>
              {/* <input value={user.email} readOnly className={css.settingInput} /> */}
            </div>
          </div>

          <div className={css.settingsDailyNormaText}>
            <p className={css.settingLabel}>My daily norma</p>

            <div className={css.normaCalculationExample}>
              <div className={css.normaCalculationGender}>
                <p>For woman:</p>
                <p className={css.normaCalculationFormula}>
                  V=(M*0,03) + (T*0,4)
                </p>
              </div>
              <div className={css.normaCalculationGender}>
                <p>For man:</p>
                <p className={css.normaCalculationFormula}>
                  V=(M*0,04) + (T*0,6)
                </p>
              </div>
            </div>

            <p className={css.normaCalculationText}>
              <span className={css.normaCalculationTextAccent}>*</span>V is the
              volume of the water norm in liters per day, M is your body weight,
              T is the time of active sports, or another type of activity
              commensurate in terms of loads (in the absence of these, you must
              set 0)
            </p>

            <p>
              <svg width="16" height="16">
                <use href={`${sprite}#icon-exclamation`} />
              </svg>
              Active time in hours
            </p>
          </div>

          <div className={css.settingsWeightSport}>
            <div className={css.labelInput}>
              <label>Your weight in kilograms:</label>
              <input
                type="string"
                {...register('weight')}
                className={clsx(css.settingInput, {
                  [css.error]: errors.weight,
                })}
              />
              <p className={css.errorMessage}>{errors.weight?.message}</p>
            </div>

            <div className={css.labelInput}>
              <label>The time of active participation in sports:</label>
              <input
                type="string"
                {...register('activeSportsTime')}
                className={clsx(css.settingInput, {
                  [css.error]: errors.activeSportsTime,
                })}
              />
              <p className={css.errorMessage}>
                {errors.activeSportsTime?.message}
              </p>
            </div>
          </div>

          <div className={css.settingsDailyNormaInput}>
            <div className={css.dailyNormaRecomended}>
              <p>The required amount of water in liters per day:</p>
              <p className={css.dailyNormaRecomendedNumber}>
                {dailyWaterRecomended}L
              </p>
            </div>

            <div className={css.labelInput}>
              <label className={css.settingLabel}>
                Write down how much water you will drink:
              </label>
              <input
                type="string"
                {...register('dailyWaterIntake')}
                placeholder={dailyWaterRecomended}
                className={clsx(css.settingInput, {
                  [css.error]: errors.dailyWaterIntake,
                })}
              />
              <p className={css.errorMessage}>
                {errors.dailyWaterIntake?.message}
              </p>
            </div>
          </div>
        </div>
        <button type="submit" className={css.formBtn}>
          Save
        </button>
      </form>
    </div>
  );
};
export default UserSettingsForm;
