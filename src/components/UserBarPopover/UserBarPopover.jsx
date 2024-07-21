import { useState } from 'react';
import clsx from 'clsx';
import sprite from '../../assets/icons/icons.svg';

import UserSettingModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';


import css from './UserBarPopover.module.css';

const UserBarPopover = ({ userBarPopover, closeUserBarPopover, width }) => {
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [logOutModalIsOpen, setLogOutModalIsOpen] = useState(false);

  function openSetting() {
    setSettingModalIsOpen(true);
    closeUserBarPopover(false);
  }

  function openLogOut() {
    setLogOutModalIsOpen(true);
    closeUserBarPopover(false);
  }

  return (
    <>
      <div
        className={clsx(css.backdropPopover, {
          [css.activeBackdropPopover]: userBarPopover,
        })}
        onClick={() => closeUserBarPopover(false)}
      ></div>
      <div style={{ width, }}
        className={clsx(css.userBarPopover, {
          [css.active]: userBarPopover,
        })}
      >
        <ul className={css.popoverContent}>
          <li className={clsx(css.popoverItem, {
              [css.textSettingColor]: true,
          })} onClick={() => openSetting()}>
            <svg className={css.iconSettingColor} width="16" height="16">
              <use href={`${sprite}#icon-settings`} />
            </svg>
            Setting
          </li>
          <li
            className={clsx(css.popoverItem, {
              [css.textColor]: true,
            })}
            onClick={() => openLogOut()}
          >
            <svg className={css.iconColor} width="16" height="16">
              <use href={`${sprite}#icon-log-out`} />
            </svg>
            Log out
          </li>
        </ul>
      </div>
      <UserSettingModal
    settingModalIsOpen={settingModalIsOpen}
    closeSettingModal={setSettingModalIsOpen}
  />
  <LogOutModal
    logOutModalIsOpen={logOutModalIsOpen}
    closeLogOutModal={setLogOutModalIsOpen}
  />
    </>
  );
};

export default UserBarPopover;
