// import UserPanel from './components/UserPanel/UserPanel.jsx'
//     <UserPanel name="Nadia" email="zharovskiy@gmai.com" avatar=""/>

import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";

import UserBar from '../UserBar/UserBar.jsx';

import css from './UserPanel.module.css';

const UserPanel = () => {
  const userData = useSelector(selectUserData);
  const [name, email, avatar] = userData;

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