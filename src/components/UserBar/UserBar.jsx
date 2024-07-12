import clsx from "clsx";
import avatarBase from '../../assets/images/avatarBase.png';
import sprite from '../../assets/icons/icons.svg';
import { useState } from "react";

import UserBarPopover from '../UserBarPopover/UserBarPopover';
import UserSettingModal from '../UserSettingsModal/UserSettingsModal.jsx';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';

import css from './UserBar.module.css';

const UserBar = ({ name, avatar }) => {
  const [userBarPopover, setUserBarPopover] = useState(false);
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [logOutModalIsOpen, setLogOutModalIsOpen] = useState(false);

  function openUserBarPopover() {
    setUserBarPopover(true)
  }

  function closeUserBarPopover() {
    setUserBarPopover(false)
  }

  function openSettingModal() {
    setSettingModalIsOpen(true)
  }

  function closeSettingModal() {
    setSettingModalIsOpen(false)
  }

  function openLogOutModal() {
    setLogOutModalIsOpen(true);
  }

  function closeLogOutModal() {
    setLogOutModalIsOpen(false);
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
                <use href={`${sprite}#icon-chevron-down`} />
            </svg>
        </button>
        <UserBarPopover userBarPopover={userBarPopover} 
                        closeUserBarPopover={closeUserBarPopover} 
                        openSettingModal={openSettingModal}
                        openLogOutModal={openLogOutModal}/>
        <UserSettingModal settingModalIsOpen={settingModalIsOpen}
                          closeSettingModal={closeSettingModal}/>
        <LogOutModal logOutModalIsOpen={logOutModalIsOpen} 
                     closeLogOutModal={closeLogOutModal}
        />  
    </div>
  )
}

export default UserBar