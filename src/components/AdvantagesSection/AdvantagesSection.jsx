import css from './AdvantagesSection.module.css';
import icons from '../../assets/icons/icons.svg';

import customer1Mob from '../../assets/images/customer-1-mob.png';
import customer2Mob from '../../assets/images/customer-2-mob.png';
import customer3Mob from '../../assets/images/customer-3-mob.png';
import customer1Mob_2x from '../../assets/images/customer-1-mob-2x.png';
import customer2Mob_2x from '../../assets/images/customer-2-mob-2x.png';
import customer3Mob_2x from '../../assets/images/customer-3-mob-2x.png';
import customer1 from '../../assets/images/customer-1.png';
import customer2 from '../../assets/images/customer-2.png';
import customer3 from '../../assets/images/customer-3.png';
import customer1_2x from '../../assets/images/customer-1-2x.png';
import customer2_2x from '../../assets/images/customer-2-2x.png';
import customer3_2x from '../../assets/images/customer-3-2x.png';


const AdvantagesSection = () => {
  return (
    <div className={css.advantageContainer}>
      <div className={css.customersContainer}>
        <ul className={css.customersList}>
          <li>
            <picture>
              <source
                srcSet={`${customer1Mob_2x} 2x, ${customer1Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${customer1_2x} 2x, ${customer1} 1x`}
                media="(min-width: 768px)"
              />
              <img src={customer1} alt="Customer 1" />
            </picture>
          </li>
          <li>
            <picture>
              <source
                srcSet={`${customer2Mob_2x} 2x, ${customer2Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${customer2_2x} 2x, ${customer2} 1x`}
                media="(min-width: 768px)"
              />
              <img src={customer2} alt="Customer 2" />
            </picture>
          </li>
          <li>
            <picture>
              <source
                srcSet={`${customer3Mob_2x} 2x, ${customer3Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${customer3_2x} 2x, ${customer3} 1x`}
                media="(min-width: 768px)"
              />
              <img src={customer3} alt="Customer 3" />
            </picture>
          </li>
        </ul>
        <p className={css.customersParagraf}>
          Our <span>happy</span> customers
        </p>
      </div>
      <div className={css.paragrafContainer}>
        <p className={css.paragrafHabit}>
          <svg width="8" height="8">
            <use href={`${icons}#icon-circle`} />
          </svg>
          Habit drive
        </p>
        <p className={css.paragrafView}>View statistics</p>
        <p className={css.paragrafPersonal}>Personal rate setting</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
