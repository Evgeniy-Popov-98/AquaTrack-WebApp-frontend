import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import UserBar from '../UserBar/UserBar.jsx';

import css from './UserPanel.module.css';

const UserPanel = () => {
  const userData = useSelector(selectUser);
  const { name, email, avatar } = userData;

  function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let userName;
  if (name) {
    userName = uppercaseFirstLetter(name);
  } else {
    if (email) {
      const index = email.indexOf('@');
      userName = uppercaseFirstLetter(email.slice(0, index));
    }
  }

  return (
    <div className={css.boxUserPanel}>
      <h2 className={css.title}>
        Hello<span className={css.name}>, {userName}!</span>
      </h2>
      <UserBar name={userName} avatar={avatar} />
    </div>
  );
};

export default UserPanel;
