import clsx from "clsx";

import sprite from '../../assets/icons/icons.svg';

import css from "./UserBarPopover.module.css"

const UserBarPopover = ({userBarPopover, closeUserBarPopover, openSettingModal, openLogOutModal}) => {
  function openSetting () {
    openSettingModal();
    closeUserBarPopover();
  }

  function logOut () {
    openLogOutModal();
    closeUserBarPopover();
  }

  return (
    <>
        <div
            className={clsx(css.backdropPopover, {
              [css.activeBackdropPopover]: userBarPopover,
            })}
            onClick={()=> closeUserBarPopover()}
        ></div>
        <div className={clsx(css.userBarPopover, {
              [css.active]: userBarPopover,
            })}>
            <ul className={css.popoverContent}>
                <li className={css.popoverItem} onClick={()=>openSetting()}>
                    <svg width="16" height="16">
                        <use href={`${sprite}#icon-settings`} />
                    </svg>Setting
                </li>
                <li className={clsx(css.popoverItem, {
                  [css.textColor]: true,
                })}  onClick={()=>logOut()}>
                    <svg className={css.iconColor} width="16" height="16">
                        <use href={`${sprite}#icon-log-out`} />
                    </svg>Log out
                </li>
            </ul>
        </div>
        
    </>
  )
}

export default UserBarPopover