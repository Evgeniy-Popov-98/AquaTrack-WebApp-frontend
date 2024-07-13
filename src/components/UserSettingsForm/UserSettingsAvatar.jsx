import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import avatarFirst from './smile.jpeg';
import css from './UserSettingsForm.module.css';
import { useEffect, useState } from 'react';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB

const schema = yup.object().shape({
  avatar: yup
    .mixed()
    .test('fileSize', 'The file size is too much', value => {
      if (!value.length) return true; // allow empty file
      return value[0].size <= FILE_SIZE;
    })
    .test('fileType', 'The file must be an image', value => {
      if (!value.length) return true; // allow empty file
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
});

export default function UserSettingsAvatar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [preview, setPreview] = useState(avatarFirst);

  const onSubmit = data => {
    console.log(data);
    // const formData = new FormData();
    // Object.keys(data).forEach(key => formData.append(key, data[key]));

    // console.log(...formData);
  };

  const file = watch('avatar');
  useEffect(() => {
    if (file && file.length > 0) {
      const isValidFileType = SUPPORTED_FORMATS.includes(file[0].type);
      if (isValidFileType) {
        const objectUrl = URL.createObjectURL(file[0]);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setPreview(avatarFirst);
      }
    } else {
      setPreview(avatarFirst);
    }
  }, [file]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
      )}

      <div>
        <label>upload a photo</label>
        <input {...register('avatar')} type="file" />
        <p className={css.errorMessage}>{errors.avatar?.message}</p>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
