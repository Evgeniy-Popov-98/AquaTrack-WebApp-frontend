import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section>
      <div className={css.homeContainer}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </section>
  );
};

export default HomePage;
