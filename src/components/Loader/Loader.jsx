import { Comment } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({ loading = false }) => {
  return (
    <div className={loading ? css.loaderActive : css.noLoaderActive}>
      <Comment
        visible={loading}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#9be1a0"
      />
    </div>
  );
};

export default Loader;
