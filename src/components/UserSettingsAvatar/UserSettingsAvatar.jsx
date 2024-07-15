import css from './UserSettingsAvatar.module.css';
import icons from '../../assets/icons/icons.svg';

const UserSettingsAvatar = () => {
  const defaultAvatar = '/src/assets/images/Ellipse 14.jpg';
  console.log('hi');
  return (
    <div className={css.avatarContainer}>
      <img src={defaultAvatar} alt="Avatar" className={css.avatar} />
      <input
        type="file"
        id="uploadInput"
        accept="image/*"
        className={css.uploadInput}
      />
      <label htmlFor="uploadInput" className={css.uploadLabel}>
        <svg className={css.icon} width="20" height="20">
          <use href={`${icons}#icon-upload`} />
        </svg>
        Upload a photo
      </label>
    </div>
  );
};
export default UserSettingsAvatar;
