import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserSettingsAvatar from './UserSettingsAvatar';
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
  const dayliNormaNumber = convertingToNumber(watch('dayliNorma'));

  const dayliNormaRecomended = dailyNormaRecomendCalculation(
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
        case 'dayliNorma':
          if (data[key]) {
            return formData.append(key, dayliNormaNumber);
          } else {
            return formData.append(key, dayliNormaRecomended);
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
    <div>
      <UserSettingsAvatar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Your gender identity</label>
          <input type="radio" value="female" {...register('gender')} /> Woman
          <input type="radio" value="male" {...register('gender')} /> Man
          <p className={css.errorMessage}>{errors.gender?.message}</p>
        </div>

        <div>
          <label>Your name</label>
          <input {...register('username')} />
          <p className={css.errorMessage}>{errors.username?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input {...register('email')} />
          <p className={css.errorMessage}>{errors.email?.message}</p>
        </div>
        <div>
          <h2>My daily norma</h2>
          <div>
            <div>
              <p>For woman:</p>
              <p>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div>
              <p>For man:</p>
              <p>V=(M*0,04) + (T*0,6)</p>
            </div>

            <p>
              * V is the volume of the water norm in liters per day, M is your
              body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these,
              you must set 0)
            </p>
            <p>!Active time in hours</p>
          </div>
        </div>

        <div>
          <label>Your weight in kilograms:</label>
          <input type="string" {...register('weight')} />
          <p className={css.errorMessage}>{errors.weight?.message}</p>
        </div>

        <div>
          <label>The time of active participation in sports:</label>
          <input type="string" {...register('sportTime')} />
          <p className={css.errorMessage}>{errors.sportTime?.message}</p>
        </div>

        <div>
          <p style={{ color: 'blue' }}>
            The required amount of water in liters per day:
            {dayliNormaRecomended}l
          </p>
          <label>Write down how much water you will drink:</label>
          <input
            type="string"
            {...register('dayliNorma')}
            placeholder={dayliNormaRecomended}
          />
          <p>{errors.dayliNorma?.message}</p>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
