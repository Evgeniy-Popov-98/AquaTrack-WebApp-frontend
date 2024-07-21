import { Link } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = ({ styleBtn = false }) => {
  return (
    <Link className={styleBtn ? css.logo : css.logoTrackerPage} to="/">
      AquaTrack
    </Link>
  );
};

export default Logo;
