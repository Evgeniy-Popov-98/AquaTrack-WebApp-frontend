import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserSettingsAvatar.module.css';
import icons from '../../assets/icons/icons.svg';
import defaultAvatarImage from '../../assets/images/Ellipse 14.jpg'





const UserSettingsAvatar = () => {
   const dispatch = useDispatch() 
  const [avatar, setAvatar] = useState(defaultAvatarImage);

 
  const handleAvatarChange = (e) => {
    const newAvatar = e.target.files[0];
    console.log(newAvatar);
    console.log(newAvatar.name);
    setAvatar(newAvatar);
  }

  useEffect(() => {
    const url = avatar && avatar instanceof File ? URL.createObjectURL(avatar) : null;
   console.log(url) 
   
    return 
  }, [avatar]);
 
  // useEffect(() => {
  //   const url = avatar && avatar instanceof File ? URL.createObjectURL(avatar) : null;
  //  console.log(url) 
  //   return () => {
  //     if (url) URL.revokeObjectURL(url);
  //   }
  // }, [avatar]);
  console.log(avatar);
 



  return (
    <div className={css.avatarContainer}>
      <img src={avatar && avatar instanceof File ? URL.createObjectURL(avatar) : defaultAvatarImage} alt="Avatar" className={css.avatar} />
      {/* <img src={defaultAvatarImage} alt="Avatar" className={css.avatar} /> */}
      <input
        type="file"
        id="uploadInput"
        accept="image/*"
        className={css.uploadInput}
        onChange={handleAvatarChange}
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
