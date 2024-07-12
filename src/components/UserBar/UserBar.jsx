import clsx from "clsx";
import avatarBase from '../../assets/images/avatarBase.png';
import chevronDown from '../../assets/icons/icons.svg';
import { useState } from "react";

import UserBarPopover from '../UserBarPopover/UserBarPopover';

import css from './UserBar.module.css';

const UserBar = ({ name, avatar }) => {
  const [userBarPopover, setUserBarPopover] = useState(false);

  function openUserBarPopover() {
    setUserBarPopover(true)
  }

  function closeUserBarPopover() {
    setUserBarPopover(false)
  }

  return (  
    <div className={css.boxUserBar}>
        <button className={css.btnUserBar} onClick={()=> openUserBarPopover()}>
            <p className={css.userName}>{name}</p>
            <img className={css.avatar} src={avatar ? avatar : avatarBase} alt="avatar" />
            <svg 
                className={clsx(css.staticPositionIcon, {
                    [css.activeRotateIcon]: userBarPopover,
                })} 
                width="16" height="16">
                <use href={`${chevronDown}#icon-chevron-down`} />
            </svg>
        </button>
        <UserBarPopover userBarPopover={userBarPopover} closeUserBarPopover={closeUserBarPopover}/>  
    </div>
  )
}

export default UserBar