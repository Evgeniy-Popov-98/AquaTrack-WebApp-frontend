import css from './UserSettingsAvatar.module.css';
import icons from '../../assets/icons/icons.svg';
import defaultAvatarImage from '../../assets/images/Ellipse 14.jpg';

const UserSettingsAvatar = ({ onChange, fileInputRef, preview }) => {
  return (
    <div className={css.avatarContainer}>
      <img
        className={css.avatar}
        src={preview ? preview : defaultAvatarImage}
        alt="Avatar"
        width="75"
        height="75"
      />
      <input
        type="file"
        id="uploadInput"
        accept="image/*"
        className={css.uploadInput}
        onChange={onChange}
        // onChange={(e) => {console.log("Selected file", e.target.files[0])} }
        ref={fileInputRef}
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
