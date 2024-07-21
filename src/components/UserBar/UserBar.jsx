import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import avatarBase from '../../assets/images/Ellipse 14.jpg';
import sprite from '../../assets/icons/icons.svg';

import UserBarPopover from '../UserBarPopover/UserBarPopover';

import css from './UserBar.module.css';

const UserBar = ({ name, avatar }) => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [userBarPopover, setUserBarPopover] = useState(false);
  console.log(avatar);

  useEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className={css.boxUserBar}>
      <button ref={elementRef} className={css.btnUserBar} onClick={() => setUserBarPopover(true)}>
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
        width={width}
      />
    </div>
  );
};

export default UserBar;
