import UserBar from '../UserBar/UserBar.jsx';

import css from './UserPanel.module.css';

const UserPanel = ({ name, email, avatar }) => {
  let userName;
  if(name) {
    userName = name;
  } else {
    const index = email.indexOf('@');
    userName = email.slice(0, index);
  }

  return (
    <div className={css.boxUserPanel}>
        <h2 className={css.title}>Hello<span className={css.name}>, {userName}!</span></h2>
        <UserBar name={userName} avatar={avatar} />
    </div>
    
  )
}

export default UserPanel