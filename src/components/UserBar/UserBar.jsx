import { useState } from 'react';
import clsx from 'clsx';
import avatarBase from '../../assets/images/avatarBase.png';
import sprite from '../../assets/icons/icons.svg';

import UserBarPopover from '../UserBarPopover/UserBarPopover';

import css from './UserBar.module.css';

const UserBar = ({ name, avatar }) => {
  const [userBarPopover, setUserBarPopover] = useState(false);

  return (
    <div className={css.boxUserBar}>
      <button className={css.btnUserBar} onClick={() => setUserBarPopover(true)}>
        <p className={css.userName}>{name}</p>
        <img
          className={css.avatar}
          src={avatar ? avatar : avatarBase}
          alt="avatar"
        />
        <svg
          className={clsx(css.staticPositionIcon, {
            [css.activeRotateIcon]: userBarPopover,
          })}
        >
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      </button>
      <UserBarPopover
        userBarPopover={userBarPopover}
        closeUserBarPopover={setUserBarPopover}
      />
    </div>
  );
};

export default UserBar;
