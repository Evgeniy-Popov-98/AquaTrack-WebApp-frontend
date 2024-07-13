import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserSettingsAvatar from './UserSettingsAvatar';
import css from './UserSettingsForm.module.css';

// const dailyNormaRecomendCalculation = (gender, weight = 0, sport = 0) => {
//   if (!weight) return 1.8;
//   switch (gender) {
//     case 'female':
//       return (weight * 0.03 + sport * 0.4).toFixed(1);
//     case 'male':
//       return (weight * 0.04 + sport * 0.6).toFixed(1);
//   }
// };

const DECIMAL_PATTERN = /^\d+(\.\d+)?$/;

const schema = yup.object().shape({
  name: yup.string(),
  gender: yup.string().oneOf(['female', 'male']),
  email: yup.string().email(),
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
      name: '',
      weight: null,
      sportTime: null,
      dailyNorma: null,
    },
  });

  const onSubmit = data => {
    console.log(data);
    // const formData = new FormData();
    // Object.keys(data).forEach(key => formData.append(key, data[key]));

    // console.log(...formData);
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

  const genderInput = watch('gender');
  const weightInput = watch('weight');
  const sportTimeInput = watch('sportTime');
  //   console.log('genderInput', genderInput, typeof genderInput);
  //   console.log('weightInput', weightInput, typeof weightInput);
  //   console.log('sportTimeInput', sportTimeInput, typeof sportTimeInput);

  //   const dailyNormaRecomend = dailyNormaRecomendCalculation(
  //     genderInput,
  //     weightInput,
  //     sportTimeInput
  //   );

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
          <input {...register('name')} />
          <p className={css.errorMessage}>{errors.name?.message}</p>
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
          <input type="number" {...register('weight')} />
          <p className={css.errorMessage}>{errors.weight?.message}</p>
        </div>

        <div>
          <label>The time of active participation in sports:</label>
          <input type="number" {...register('sportTime')} />
          <p className={css.errorMessage}>{errors.sportTime?.message}</p>
        </div>

        <div>
          <p>
            {/* The required amount of water in liters per day: {dailyNormaRecomend} l */}
            The required amount of water in liters per day: l
          </p>
          <label>Write down how much water you will drink:</label>
          <input
            type="number"
            {...register('dailyNorma')}
            //   placeholder={dailyNormaRecomend}
          />
          <p className={css.errorMessage}>{errors.waterAmount?.message}</p>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
