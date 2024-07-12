import UserBar from '../UserBar/UserBar.jsx';

import css from './UserPanel.module.css';

const UserPanel = ({ name, avatar }) => {
  return (
    <>
        <h2 className={css.title}>Hello<span className={css.name}>, {name}!</span></h2>
        <UserBar name={name} avatar={avatar} />
    </>
    
  )
}

export default UserPanel