// email from backend
// відправка formData на backend

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserSettingsAvatar from './UserSettingsAvatar';
import clsx from 'clsx';
import sprite from '../../assets/icons/icons.svg';
import css from './UserSettingsForm.module.css';

const DECIMAL_PATTERN = /^\d+(\.\d+)?$/;

const convertingToNumber = str => {
  return Math.floor(parseFloat(str) * 10) / 10;
};

const dailyNormaRecomendCalculation = (gender, weight, sport) => {
  if (!weight) return 1.8;
  if (!sport) sport = 0;
  const baseValue = gender === 'female' ? 0.03 : 0.04;
  const sportValue = gender === 'female' ? 0.4 : 0.6;
  return (weight * baseValue + sport * sportValue).toFixed(1);
};

const schema = yup.object().shape({
  username: yup.string().notRequired(),
  gender: yup.string().oneOf(['female', 'male']),
  email: yup.string().email().notRequired(),
  weight: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
  sportTime: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
  dailyNorma: yup
    .string()
    .matches(DECIMAL_PATTERN, 'please enter a number')
    .notRequired(),
});

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'female',
      username: null,
      weight: null,
      sportTime: null,
      dailyNorma: null,
    },
  });

  const genderValue = watch('gender');
  const weightNumber = convertingToNumber(watch('weight'));
  const sportTimeNumber = convertingToNumber(watch('sportTime'));
  const dailyNormaNumber = convertingToNumber(watch('dailyNorma'));

  const dailyNormaRecomended = dailyNormaRecomendCalculation(
    genderValue,
    weightNumber,
    sportTimeNumber
  );

  const onSubmit = data => {
    console.log(data);

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      switch (key) {
        case 'gender':
          return formData.append(key, data[key]);
        case 'username':
          if (data[key]) {
            formData.append(key, data[key]);
          }
          break;
        case 'email':
          if (data[key]) {
            formData.append(key, data[key]);
          }
          break;
        case 'weight':
          if (weightNumber) {
            formData.append(key, weightNumber);
          }
          break;
        case 'sportTime':
          if (sportTimeNumber) {
            formData.append(key, sportTimeNumber);
          }
          break;
        case 'dailyNorma':
          if (data[key]) {
            return formData.append(key, dailyNormaNumber);
          } else {
            return formData.append(key, dailyNormaRecomended);
          }
      }
    });

    console.log(...formData);
  };

  // useEffect(() => {
  //   you can do async server request and fill up form: email
  //   setTimeout(() => {
  //     reset({
  //       firstName: 'bill',
  //       lastName: 'luo',
  //     });
  //   }, 2000);
  // }, [reset]);

  return (
    <div className={css.settingsContainer}>
      <UserSettingsAvatar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.settingsForm}>
          <div className={css.settingsFormDesktop}>
            <div className={css.settingsGender}>
              <p className={css.settingLabel}>Your gender identity</p>

              <div className={css.radioButton}>
                <label className={css.customRadio}>
                  <input type="radio" value="female" {...register('gender')} />
                  <span className={css.customRadioButton}></span>
                  Woman
                </label>
                <label className={css.customRadio}>
                  <input type="radio" value="male" {...register('gender')} />
                  <span className={css.customRadioButton}></span>
                  Man
                </label>
              </div>

              <p className={css.errorMessage}>{errors.gender?.message}</p>
            </div>

            <div className={css.settingsNameEmailWrap}>
              <div className={css.settingsNameEmail}>
                <label className={css.settingLabel}>Your name</label>
                <input
                  {...register('username')}
                  className={clsx(css.settingInput, {
                    [css.error]: errors.username,
                  })}
                />
                <p className={css.errorMessage}>{errors.username?.message}</p>
              </div>

              <div className={css.settingsNameEmail}>
                <label className={css.settingLabel}>Email</label>
                <input
                  {...register('email')}
                  className={clsx(css.settingInput, {
                    [css.error]: errors.email,
                  })}
                />
                <p className={css.errorMessage}>{errors.email?.message}</p>
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
                <span className={css.normaCalculationTextAccent}>*</span>V is
                the volume of the water norm in liters per day, M is your body
                weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>

              <p>
                <svg width="16" height="16">
                  <use href={`${sprite}#icon-exclamation`} />
                </svg>
                Active time in hours
              </p>
            </div>
          </div>

          <div className={css.settingsFormDesktop}>
            <div className={css.settingsWeightSport}>
              <div>
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

              <div>
                <label>The time of active participation in sports:</label>
                <input
                  type="string"
                  {...register('sportTime')}
                  className={clsx(css.settingInput, {
                    [css.error]: errors.sportTime,
                  })}
                />
                <p className={css.errorMessage}>{errors.sportTime?.message}</p>
              </div>
            </div>

            <div className={css.settingsDailyNorma}>
              <div>
                <p>The required amount of water in liters per day:</p>
                <p className={css.dailyNormaRecomended}>
                  {dailyNormaRecomended}L
                </p>
              </div>

              <div>
                <label className={css.settingLabel}>
                  Write down how much water you will drink:
                </label>
                <input
                  type="string"
                  {...register('dailyNorma')}
                  placeholder={dailyNormaRecomended}
                  className={clsx(css.settingInput, {
                    [css.error]: errors.dailyNorma,
                  })}
                />
                <p className={css.errorMessage}>{errors.dailyNorma?.message}</p>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className={css.formBtn}>
          Save
        </button>
      </form>
    </div>
  );
}
