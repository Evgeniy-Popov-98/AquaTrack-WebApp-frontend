import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyGoogleOAuth } from '../redux/auth/operations.js';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      dispatch(verifyGoogleOAuth({ code })).then(resultAction => {
        if (verifyGoogleOAuth.fulfilled.match(resultAction)) {
          navigate('/tracker');
        } else {
          navigate('/signin');
        }
      });
    } else {
      navigate('/signin');
    }
  }, [dispatch, navigate]);

  return null;
};

export default GoogleAuthCallback;
