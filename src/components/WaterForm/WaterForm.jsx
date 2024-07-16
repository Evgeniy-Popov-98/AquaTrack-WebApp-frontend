import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './WaterForm.module.css';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/operations';

const schema = yup.object().shape({
  amountLiters: yup
    .number()
    .typeError('Minimum amount is 10ml')
    .min(10, 'Minimum amount is 10ml')
    .required('Amount is required'),
  time: yup.string().required('Time is required'),
});

const WaterForm = ({ closeWaterModal }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amountLiters: 50,
      time: new Date().toTimeString().slice(0, 5),
    },
  });

  const onSubmit = data => {
    dispatch(addWater(data)).then(() => {
      closeWaterModal();
    });
  };

  const increaseAmount = () => {
    const currentAmount = parseInt(getValues('amountLiters'), 10);
    setValue('amountLiters', currentAmount + 10);
  };

  const decreaseAmount = () => {
    const currentAmount = parseInt(getValues('amountLiters'), 10);
    setValue('amountLiters', Math.max(10, currentAmount - 10));
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>Amount of water:</p>
        <div className={css.waterCounter}>
          <button
            type="button"
            className={css.waterCountBtn}
            onClick={decreaseAmount}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.75"
                y="0.75"
                width="38.5"
                height="38.5"
                rx="19.25"
                stroke="#323F47"
                strokeWidth="1.5"
              />
              <path
                d="M12.8569 20H27.1426"
                stroke="#323F47"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Controller
            name="amountLiters"
            control={control}
            render={({ field }) => (
              <div className={css.waterAmount}>{field.value} ml</div>
            )}
          />
          <button
            type="button"
            className={css.waterCountBtn}
            onClick={increaseAmount}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.75"
                y="0.75"
                width="38.5"
                height="38.5"
                rx="19.25"
                stroke="#323F47"
                strokeWidth="1.5"
              />
              <path
                d="M20 12.8572V27.1429"
                stroke="#323F47"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.8569 20H27.1426"
                stroke="#323F47"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {errors.amountLiters && (
          <p className={css.error}>{errors.amountLiters.message}</p>
        )}
      </div>
      <p>Recording time:</p>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <input type="time" {...field} className={css.timeInput} />
        )}
      />
      {errors.time && <p className={css.error}>{errors.time.message}</p>}
      <p className={css.waterInput}>Enter the value of the water used:</p>
      <Controller
        name="amountLiters"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            className={css.amountInput}
            placeholder="Enter amount (ml)"
          />
        )}
      />
      <button className={css.saveBtn} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
