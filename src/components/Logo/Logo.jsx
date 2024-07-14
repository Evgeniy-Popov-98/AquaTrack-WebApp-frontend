import { Link } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = () => {
  return (
    <Link className={css.logo} to="/">
      AquaTrack
    </Link>
  );
};

export default Logo;
