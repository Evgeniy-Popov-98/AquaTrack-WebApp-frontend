import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const dailyNorma = (gender, weight = 0, sport = 0) => {
  console.log(gender, weight, sport);

  if (weight === 0) return 1.8;
  switch (gender) {
    case 'female':
      return (weight * 0.03 + sport * 0.4).toFixed(1);
      break;
    case 'male':
      return (weight * 0.04 + sport * 0.6).toFixed(1);
      break;
  }
};
console.log(dailyNorma('male', 70, 2));

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    gender: yup
      .string()
      .oneOf(['female', 'male'], 'Gender is required')
      .required('Gender is required'),
    email: yup.string().email(),
    weight: yup.number().positive().required('Weight is required'),
    sportTime: yup.number().positive().required('sportTime is required'),
    waterAmount: yup.number().positive().required('sportTime is required'),
  })
  .required();

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'female',
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Your gender identity</label>
        <input type="radio" value="female" {...register('gender')} /> Woman
        <input type="radio" value="male" {...register('gender')} /> Man
        <p>{errors.gender?.message}</p>
      </div>

      <div>
        <label>Your name</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <h2>My daily norma</h2>
        <section>
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
        </section>
      </div>
      <div>
        <label>Your weight in kilograms:</label>
        <input type="number" {...register('weight')} />
        <p>{errors.weight?.message}</p>
      </div>

      <div>
        <label>The time of active participation in sports:</label>
        <input type="number" {...register('sportTime')} />
        <p>{errors.sportTime?.message}</p>
      </div>

      <div>
        <p>The required amount of water in liters per day:</p>
        <label>The required amount of water in liters per day:</label>
        <input type="number" {...register('waterAmount')} />
        <p>{errors.waterAmount?.message}</p>
      </div>

      {/* <input type="submit" /> */}
      <button type="submit">Save</button>
    </form>
  );
}
