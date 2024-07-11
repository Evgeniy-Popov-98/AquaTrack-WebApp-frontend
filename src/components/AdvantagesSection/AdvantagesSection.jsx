import css from './AdvantagesSection.module.css';

import customer1 from '../../assets/images/customer-1-mob.png';
import customer2 from '../../assets/images/customer-2-mob.png';
import customer3 from '../../assets/images/customer-3-mob.png';

const customers = [
  {
    id: 1,
    src: customer1,
  },
  {
    id: 2,
    src: customer2,
  },
  {
    id: 3,
    src: customer3,
  },
];

const AdvantagesSection = () => {
  return (
    <div className={css.advantageContainer}>
      <div className={css.customersContainer}>
        <ul className={css.customersList}>
          {customers.map(customer => (
            <li key={customer.id}>
              <img src={customer.src} alt="" />
            </li>
          ))}
        </ul>
        <p className={css.customersParagraf}>
          Our <span>happy</span> customers
        </p>
      </div>
      <div className={css.paragrafContainer}>
        <p className={css.paragrafHabit}>Habit drive</p>
        <p className={css.paragrafView}>View statistics</p>
        <p className={css.paragrafPersonal}>Personal rate setting</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
