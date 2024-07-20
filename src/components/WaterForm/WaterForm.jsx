import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './WaterForm.module.css';
import { useDispatch } from 'react-redux';
import icons from '../../assets/icons/icons.svg';
import { addWater } from '../../redux/water/operations';

const schema = yup.object().shape({
  amountOfWater: yup
    .number()
    .typeError('Enter a valid amount of water')
    .min(50, 'Minimum amount is 50ml')
    .max(300, 'Maximum amount is 300 ml')
    .required('Amount is required'),
  date: yup.string().required('Time is required'),
});

const WaterForm = ({ closeWaterModal, water }) => {
  const dispatch = useDispatch();

  const defaultValues = water
    ? {
        date: water.date,
        amountOfWater: water.amountOfWater,
      }
    : {
        date: new Date().toTimeString().slice(0, 5),
        amountOfWater: 50,
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async data => {
    const dataToSend = {
      amountOfWater: data.amountOfWater,
      date: data.date,
    };

    try {
    const result = await dispatch(addWater(dataToSend));
    if (result.meta.requestStatus === 'fulfilled') {
      closeWaterModal(); 
    }
  } catch (error) {
    console.error('Failed to add water:', error);
  }
  };

  const increaseAmount = () => {
    const currentAmount = parseInt(getValues('amountOfWater'), 10);
    setValue('amountOfWater', currentAmount + 10);
  };

  const decreaseAmount = () => {
    const currentAmount = parseInt(getValues('amountOfWater'), 10);
    setValue('amountOfWater', Math.max(50, currentAmount - 10));
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
            <svg className={css.counterIcon} width="40" height="40">
              <use href={`${icons}#icon-minus`} />
            </svg>
          </button>
          <div className={css.waterAmount}>{`${watch('amountOfWater')} ml`}</div>
          <button
            type="button"
            className={css.waterCountBtn}
            onClick={increaseAmount}
          >
            <svg className={css.counterIcon} width="40" height="40">
              <use href={`${icons}#icon-plus-2`} />
            </svg>
          </button>
        </div>
        {errors.amountOfWater && (
          <p className={css.error}>{errors.amountOfWater.message}</p>
        )}
      </div>
      <p>Recording time:</p>
      <input
        type="time"
        name="date"
        className={css.timeInput}
        {...register('date')}
      />
      {errors.date && <p className={css.error}>{errors.date.message}</p>}
      <p className={css.waterInput}>Enter the value of the water used:</p>
      <input
        type="number"
        name="amountOfWater"
        className={css.amountInput}
        placeholder="Enter amount (ml)"
        {...register('amountOfWater')}
        onChange={(e) => setValue('amountOfWater', Number(e.target.value))}
      />
      <button className={css.saveBtn} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
